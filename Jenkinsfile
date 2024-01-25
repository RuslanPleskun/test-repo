pipeline {
    agent any
    stages {
            stage('Build') {
                steps{
                    echo 'Building the test environment'
                    bat 'npm i'
                    bat 'npm i --save-dev cypress-mochawesome-reporter'
                    bat 'npm audit fix'
                }
            }
            stage('Testing') {
                steps {
                        echo 'Starting cypress tests'
                        script {
                            bat 'npm run cleanup && npm run e2e'
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
