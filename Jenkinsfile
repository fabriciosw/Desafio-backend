pipeline {
  agent {
    label 'kubernetes'
  }
  options {
    buildDiscarder(logRotator(numToKeepStr:'10'))
    timeout(time: 15, unit: 'MINUTES')
    ansiColor('xterm')
  }
  environment {
    KEY = sh (
        script: "find_jira_key",
        returnStdout: true
      ).trim()
    BRANCH="${env.GERRIT_BRANCH}"
   }
  stages {
    stage('generate .env') {
      steps {
        withCredentials([file(credentialsId: "quickstart-nodejs-${env.ENV_TYPE}", variable: 'envData')]) {
          writeFile file: ".env", text: readFile(envData)
        }
      }
    }
    stage('Build App') {
      steps {
        nvm('v14.18'){
          sh 'node --version'
          sh 'npm i'
          sh 'npm run build'
        }
      }
    }
    stage('Build Dockerfile') {
      steps {
        sh "docker build -t quickstart/quickstart-nodejs:$BRANCH ."
        sh "docker tag quickstart/quickstart-nodejs:$BRANCH registry.softdesign-rs.com.br/quickstart/quickstart-nodejs:$BRANCH"
        sh "docker push registry.softdesign-rs.com.br/quickstart/quickstart-nodejs:$BRANCH"
      }
    }
    stage('Undeploy') {
      steps {
        build(job:'quickstart-nodejs-undeploy', parameters:[
          string(name: 'key', value:"$BRANCH")
        ])
      }
    }
    stage('Sleep 5s for wait delete') {
      steps {
        sh "sleep 5"
      }
    }
    stage('Create kubernetes enviroment') {
      steps {
        sh "kubectl apply -f ./k8s/$BRANCH/"
      }
    }
    stage('Wait and get URL\'s') {
      environment {
        POD_NAME = sh (
          script: "kubectl get pods -n quickstart --selector=app=quickstart-nodejs-$BRANCH -o=jsonpath='{.items[0].metadata.name}'",
          returnStdout: true
        ).trim()
        APP_URL = sh (
          script: "kubectl get ingress -n quickstart quickstart-nodejs-ingress-$BRANCH -o jsonpath='{.spec.rules[0].host}'",
          returnStdout: true
        ).trim()
      }
      steps {
        sh "kubectl wait --for=condition=ready --timeout=240s -n quickstart pod/$POD_NAME"
        sh 'printf "\033[1;32m Versão disponivel em: $APP_URL  \033[0m $1"'
        script {
          env.APP_URL = APP_URL
        }
      }
    }
    stage('Move card and comment') {
      steps {
        echo "------------------------------ ${env.APP_URL}"
        build(job:'devops-transicao-jira-deploy', parameters:[
          string(name: 'GERRIT_BRANCH', value: "$GERRIT_BRANCH"),
        ])
        build(job:'devops-develop-comment', parameters:[
          string(name: 'key', value:"$KEY"),
          string(name: 'URL', value:"${env.APP_URL}")
        ])
      }
    }
  }
}
