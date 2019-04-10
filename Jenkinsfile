#!groovy​

@NonCPS
def jsonParse(def json) {
    new groovy.json.JsonSlurperClassic().parseText(json)
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
        try {
            sh 'npm install'
        } catch (e) {
            // If there was an exception thrown, the build failed
            currentBuild.result = "FAILED"
            throw e
        } finally {
          
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
    env.k8s_namespace = "did-stg"
    env.k8s_nodePort = "30001"
    env.k8s_nginxPort = "30011"
    timeout(time: 5, unit: 'DAYS') {
        input "About to deploy on $acceptanceEnv. Are you sure?"
    }
    node('master') {
        echo 'Deploying...'
        kubernetesDeploy(kubeconfigId: 'did-k8s-cluster',               // REQUIRED
            configs: 'k8s/*.yml', // REQUIRED
            enableConfigSubstitution: true,
            dockerCredentials: [
              [credentialsId: registryCredential]
            ]
        )
    }
}

stage("Deploy PRD") {
    milestone()
    env.k8s_namespace = "did-prd"
    env.k8s_nodePort = "30002"
    env.k8s_nginxPort = "30012"
    timeout(time: 5, unit: 'DAYS') {
        input "About to deploy on PRD. Are you sure?"
    }
    node('master') {
        echo 'Deploying...'
        kubernetesDeploy(kubeconfigId: 'did-k8s-cluster',               // REQUIRED
            configs: 'k8s/*.yml', // REQUIRED
            enableConfigSubstitution: true,
            dockerCredentials: [
              [credentialsId: registryCredential]
            ]
        )
   }
}


