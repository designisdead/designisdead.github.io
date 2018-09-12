#!groovy​

@NonCPS
def jsonParse(def json) {
    new groovy.json.JsonSlurperClassic().parseText(json)
}

def version;
def majorVersion;
def buildNumber;

environment {
  registry = "designisdead/website"
  registryCredential = 'did-docker-hub'
}


node('master') {
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
        def websiteImage = docker.build(registry + ":$buildNumber")
        websiteImage.push()
    }
}

def acceptanceEnv = "STG"
stage("Deploy $acceptanceEnv") {
    milestone()
    timeout(time: 5, unit: 'DAYS') {
        input "About to deploy on $acceptanceEnv. Are you sure?"
    }
    node('master') {
        echo 'Deploying...'

    }
}


