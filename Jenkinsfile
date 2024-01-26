pipeline {
    agent any
    tools {
        nodejs 'node'
        }
    options {
        ansiColor('css')
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/RuslanPleskun/test-repo.git'
            }
        }
        stage('Build') {
            steps {
                echo 'Building the test environment'
                script {
                    sh 'npm install'
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
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'cypress/report', reportFiles: '**/index.html', reportName: 'HTML Report', reportTitles: ''])
        }
    }
}
