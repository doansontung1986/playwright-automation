pipeline {
  agent any

  parameters {
    choice(name: 'NPM_SCRIPT',
           choices: ['regression', 'webTests', 'APITests'],
           description: 'regression = tất cả | webTests = @web | APITests = @api')
    choice(name: 'BROWSER',
           choices: ['default', 'chromium', 'firefox', 'webkit'],
           description: "'default' = chạy mọi project trong playwright.config.ts")
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
        sh 'rm -rf allure-results reports'
        sh '''
          set --
          if [ "$BROWSER" != "default" ]; then
            set -- --project="$BROWSER"
          fi
          npm run "$NPM_SCRIPT" -- "$@" || true
        '''
      }
    }
  }

  post {
    always {
      junit allowEmptyResults: false, testResults: 'reports/junit.xml'
      script {
        if (params.RUN_ALLURE) {
          allure allureVersion: '3', includeProperties: false, results: [[path: 'allure-results']]
        }
      }
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}