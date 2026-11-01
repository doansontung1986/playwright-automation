pipeline {
  agent any

  environment {
    CI = 'true'
  }

  options {
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install chromium'
      }
    }
    stage('Test') {
      steps {
        sh 'rm -rf allure-results reports'
        sh 'npx playwright test'
      }
    }
  }

  post {
    always {
      junit allowEmptyResults: true, testResults: 'reports/junit.xml'
      allure allureVersion: '3', includeProperties: false, results: [[path: 'allure-results']]
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}