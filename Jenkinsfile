pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building the test environment'
                script {
                    // Use 'npm ci' for faster and more reproducible builds
                    sh 'npm ci'
                    sh 'npm install --save-dev cypress-mochawesome-reporter'
                    sh 'npm audit fix'
                }
            }
        }
        stage('Testing') {
            steps {
                echo 'Starting Cypress tests'
                script {
                    sh 'npm run cleanup && npm run e2e'
                }
                echo 'Testing Complete'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploy the tests'
            }
        }
    }
    post {
        always {
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'cypress/reports', reportFiles: '**/index.html', reportName: 'HTML Report', reportTitles: ''])
        }
    }
}
