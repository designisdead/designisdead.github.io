#!groovy​

@NonCPS
def jsonParse(def json) {
  new groovy.json.JsonSlurperClassic().parseText(json)
}

/*
    Create the kubernetes namespace
 */

def createNamespace(namespace) {
  echo "Creating namespace ${namespace} if needed"

  sh "[ ! -z \"\$(kubectl get ns ${namespace} -o name 2>/dev/null)\" ] || kubectl create ns ${namespace}"
}

/*
    Helm install
 */

def helmInstall(namespace, release, buildNumber, additionalSetParams) {
  echo "Installing ${release} in ${namespace}"
  echo "Setting image tag to ${buildNumber}"
  script {
    release = "${release}-${namespace}"
    //sh "helm repo add helm ${HELM_REPO}; helm repo update"  also removed --install from helm upgrade command
    //TODO add a map of values to override
    sh """
            helm upgrade --install --namespace ${namespace} ${release} \
                --set image.tag=${buildNumber} \
                ${additionalSetParams} \
                event-api/charts/event-api
        """
    sh "sleep 5"
  }
}

/*
    Helm delete (if exists)
 */

def helmDelete(namespace, release) {
  echo "Deleting ${release} in ${namespace} if deployed"

  script {
    release = "${release}-${namespace}"
    sh "[ -z \"\$(helm ls --short ${release} 2>/dev/null)\" ] || helm delete --purge ${release}"
  }
}

def version;
def majorVersion;
def buildNumber;

def registry = "designisdead/website"
def registryCredential = 'did-docker-hub'


node('master') {
  def websiteImage
  checkout scm
  def config = jsonParse(readFile("package.json"))
  version = config["version"]
  def pos = version.lastIndexOf(".")
  majorVersion = version.substring(0, pos)
  def revisionNumber = sh(returnStdout: true, script: 'git rev-list --count HEAD')
  buildNumber = version + "-r" + revisionNumber
  VersionNumber "${buildNumber}"
  currentBuild.displayName = buildNumber
  echo "Branch is ${env.BRANCH_NAME}"
  echo "Version is ${version}"
  echo "MajorVersion is ${majorVersion}"
  echo "buildNumber is ${buildNumber}"

  env.buildNumber = "${buildNumber}"

  stage('Build') {
    docker.image('node:8-alpine').inside {
      withEnv(['HOME=.']) {
        try {
          sh "npm install"

        } catch (e) {
          // If there was an exception thrown, the build failed
          currentBuild.result = "FAILED"
          throw e
        } finally {

        }
      }
    }
  }

  stage('Building image') {
    websiteImage = docker.build(registry)
  }

  stage('Publish image') {
    docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
      websiteImage.push("${buildNumber}")
      websiteImage.push("latest")
    }
  }
}

def acceptanceEnv = "STG"
stage("Deploy $acceptanceEnv") {
  milestone()
  timeout(time: 5, unit: 'DAYS') {
    input "About to deploy on $acceptanceEnv. Are you sure?"
  }
  node('master') {
    try {
      def namespace = "did-stg"
      echo "Deploying application ${imageName} to ${namespace} namespace on k8s ..."
      docker.image('dtzar/helm-kubectl:2.14.3').inside {
        withKubeConfig([credentialsId: 'did-k8s-cluster-jenkins-token',
                        serverUrl    : 'https://172.31.17.254:6443'
        ]) {
          env.k8s_namespace = namespace
          env.k8s_nginxPort = "30001"
          env.k8s_environment = "staging"
          env.k8s_apiUrl = "https://event-api-stg.designisdead.com/api/event"

          env.ingress_host = "event-api-stg.designisdead.com"
          withCredentials([string(credentialsId: 'did-website-confluent-cloud-api-key', variable: 'apiKey'),
                           string(credentialsId: 'did-website-confluent-cloud-api-secret', variable: 'apiSecret')]) {
            env.confluent_cloud_api_key = apiKey
            env.confluent_cloud_api_secret = apiSecret


            sh "kubectl get pods -n ${namespace}"

            // make namespace if it doesn't exist
            createNamespace(namespace)

            // Remove release if exists
            // helmDelete (namespace, "${imageName}")

            // Deploy with helm
            helmInstall(namespace, "${imageName}", "${buildNumber}", addtionalSetParams)
          }
        }
      }
      //TODO healthcheck
    } catch (e) {
      currentBuild.result = "FAILED"
      notifySlack(currentBuild.result, didDevOpsChannel)
      throw e
    }
  }
}

stage("Deploy PRD") {
  milestone()
  timeout(time: 5, unit: 'DAYS') {
    input "About to deploy on PRD. Are you sure?"
  }

  node('master') {
    try {
      def namespace = "did-prd"
      echo "Deploying application ${imageName} to ${namespace} namespace on k8s ..."
      docker.image('dtzar/helm-kubectl:2.14.3').inside {
        withKubeConfig([credentialsId: 'did-k8s-cluster-jenkins-token',
                        serverUrl    : 'https://172.31.17.254:6443'
        ]) {
          env.k8s_namespace = namespace
          env.k8s_nginxPort = "30002"
          env.k8s_environment = "production"
          env.k8s_apiUrl = "https://event-api.designisdead.com/api/event"
          env.ingress_host = "event-api.designisdead.com"

          sh "kubectl get pods -n ${namespace}"

          // make namespace if it doesn't exist
          createNamespace(namespace)

          def addtionalSetParams = '--set kafka.kafkaBrokers=$kafka_brokers \
                        --set ingress.hosts[0].host=$ingress_host \
                        '

          // Deploy with helm
          helmInstall(namespace, "${imageName}", "${buildNumber}", addtionalSetParams)

        }
      }
      //TODO healthcheck
    } catch (e) {
      currentBuild.result = "FAILED"
      notifySlack(currentBuild.result, didDevOpsChannel)
      throw e
    }
  }
}


