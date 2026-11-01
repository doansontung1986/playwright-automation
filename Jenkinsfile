pipeline {
  agent any

  parameters {
    choice(name: 'BROWSER',
           choices: ['default', 'chrome', 'firefox', 'webkit'],
           description: 'default = chạy mọi project trong playwright.config.ts')
    booleanParam(name: 'RUN_ALLURE', defaultValue: true,
                 description: 'Tạo Allure report')
  }

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
        sh 'npx playwright install'
      }
    }

    stage('Test') {
      steps {
        script {
          currentBuild.description = "BROWSER: ${params.BROWSER}"
        }
        sh 'rm -rf allure-results reports'
        sh '''
          if [ "$BROWSER" = "default" ]; then
            npm run regression || true
          else
            npm run regression -- --project="$BROWSER" || true
          fi
        '''
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
      script {
        if (params.RUN_ALLURE) {
          allure allureVersion: '3', includeProperties: false, results: [[path: 'allure-results']]
        }
      }
      junit allowEmptyResults: false, testResults: 'reports/junit.xml'
    }
  }
}