pipeline {
    agent any
    tools {
        nodejs 'node'
        }
    stages {
        stage('Build') {
            steps {
                echo 'Building the test environment'
                script {
                    sh 'npm i'
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
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'reports', reportFiles: '**/index.html', reportName: 'HTML Report', reportTitles: ''])
        }
    }
}
