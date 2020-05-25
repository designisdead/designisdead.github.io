#!groovy​

@Library('did-jenkins-shared-library')

@NonCPS
def jsonParse(def json) {
  new groovy.json.JsonSlurperClassic().parseText(json)
}

def createNamespace(namespace) {
  echo "Creating namespace ${namespace} if needed"

  sh "[ ! -z \"\$(kubectl get ns ${namespace} -o name 2>/dev/null)\" ] || kubectl create ns ${namespace}"
}

def helmInstall(namespace, release, buildNumber, additionalSetParams) {
  echo "Installing ${release} in ${namespace}"
  echo "Setting image tag to ${buildNumber}"
  script {
    release = "${release}-${namespace}"
    //sh "helm repo add helm ${HELM_REPO}; helm repo update"  also removed --install from helm upgrade command
    sh """
        helm upgrade --install --namespace ${namespace} ${release} \
            --set didWebsiteNode.image.tag=${buildNumber} \
            ${additionalSetParams} \
            charts/did-website
        """
    sh "sleep 5"
  }
}

def helmDelete(namespace, release) {
  echo "Deleting ${release} in ${namespace} if deployed"

  script {
    release = "${release}-${namespace}"
    sh "[ -z \"\$(helm ls --short ${release} 2>/dev/null)\" ] || helm delete --purge ${release}"
  }
}

def healthCheck(url, descr, user, password, buildNumber, slackChannel) {
  docker.image('node:10-alpine').inside {
    withCredentials([
      string(credentialsId: 'nexus-npm-token', variable: 'npmToken')
    ]) {
      withEnv(['HOME=.']) {
        dir('devops-tools') {
          git branch: 'master', url: 'https://bitbucket.org/designisdead/devops-tools.git', credentialsId: 'did-infra-bitbucket'

          dir(path: 'health-checks') {
            sh "echo \"//repo.designisdead.com/repository/npm-group/:_authToken=${npmToken}\" > .npmrc"
            sh 'npm install --registry=https://repo.designisdead.com/repository/npm-group/'

            def retries = 35
            def delayBetween = 20000

            echo "health-check [url: ${url}, retries: ${retries}, delay: ${delayBetween}, match: ${buildNumber}]"

            def healthCheckResult = sh(returnStdout: true, script: "set +x && node scripts/health-check.js ${url} -r ${retries} -d ${delayBetween} -m ${buildNumber} -u ${user} -p \"${password}\"")

            if (healthCheckResult.contains("Success")) {
              notifySlack("DEPLOYED ON [ENV --> ${descr}] & HEALTH CHECK COMPLETED ", slackChannel)
            } else {
              currentBuild.result = "FAILED"
              notifySlack(currentBuild.result, slackChannel)
            }
          }
        }
      }
    }
  }
}

def version;
def majorVersion;
def buildNumber;

def registry = "designisdead"
def imageName = "website"
def registryCredential = 'did-docker-hub'
def didDevOpsChannel = "devops-internal"

node('master') {
  notifySlack('STARTED', didDevOpsChannel)
  def websiteImage
  checkout scm
  def config = jsonParse(readFile("package.json"))
  version = config["version"]
  def pos = version.lastIndexOf(".")
  majorVersion = version.substring(0, pos)
  def revisionNumber = sh(returnStdout: true, script: 'git rev-list --count HEAD')
  buildNumber = version + "-r" + revisionNumber.replaceAll("(?:\\n|\\r)", "")
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
    try {
      websiteImage = docker.build(registry + '/' + imageName)
    }
    catch (e) {
      currentBuild.result = "FAILED"
      notifySlack(currentBuild.result, didDevOpsChannel)
      throw e
    }
  }

  stage('Publish image') {
    milestone()
    try {
      docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
        websiteImage.push("${buildNumber}")
        websiteImage.push("latest")
      }
    }
    catch (e) {
      currentBuild.result = "FAILED"
      notifySlack(currentBuild.result, didDevOpsChannel)
      throw e
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
          env.k8s_cloudWatchLogGroup = namespace
          env.k8s_nginxPort = "30001"
          env.k8s_environment = "staging"
          env.k8s_apiUrl = "https://event-api-stg.designisdead.com/api/event"

          // make namespace if it doesn't exist
          createNamespace(namespace)

          def addtionalSetParams = '--set cloudWatchLogGroup=$k8s_cloudWatchLogGroup \
                      --set didWebsiteNginx.service.nodePort=$k8s_nginxPort \
                      --set didWebsiteNode.environment=$k8s_environment \
                      --set didWebsiteNode.apiUrl=$k8s_apiUrl \
                      '
          // Remove release if exists
          // helmDelete (namespace, "${imageName}")

          // Deploy with helm
          helmInstall(namespace, "${imageName}", "${buildNumber}", addtionalSetParams)
        }
      }
      //TODO healthcheck
      healthCheck("https://${aemIp}/bin/version", 'STG',  username, password, "${buildNumber}", "${didDevOpsChannels}")
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
          env.k8s_cloudWatchLogGroup = namespace
          env.k8s_nginxPort = "30002"
          env.k8s_environment = "production"
          env.k8s_apiUrl = "https://event-api.designisdead.com/api/event"

          // make namespace if it doesn't exist
          createNamespace(namespace)

          def addtionalSetParams = '--set cloudWatchLogGroup=$k8s_cloudWatchLogGroup\
                        --set didWebsiteNginx.service.nodePort=$k8s_nginxPort \
                        --set didWebsiteNode.environment=$k8s_environment \
                        --set didWebsiteNode.apiUrl=$k8s_apiUrl \
                        '

          // Deploy with helm
          helmInstall(namespace, "${imageName}", "${buildNumber}", addtionalSetParams)

        }
      }
      //TODO healthcheck
      healthCheck("https://designisdead.com/bin/version", 'PRD', username, password,"${buildNumber}","${didDevOpsChannels}")

    } catch (e) {
      currentBuild.result = "FAILED"
      notifySlack(currentBuild.result, didDevOpsChannel)
      throw e
    }
  }
}


