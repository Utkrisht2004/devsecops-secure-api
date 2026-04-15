pipeline {
    agent any
    
    environment {
        IMAGE_NAME = 'secure-api'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building Secure Docker Image...'
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }
        
        stage('SAST') {
            // This explicitly grabs the tool we configured in the Jenkins UI
            environment {
                SCANNER_HOME = tool 'sonar-scanner'
            }
            steps {
                echo 'Running Static Code Analysis...'
                withSonarQubeEnv('sonar-server') {
                    // withSonarQubeEnv automatically handles the Token and URL now!
                    sh "${SCANNER_HOME}/bin/sonar-scanner -Dsonar.projectKey=healthcare-system -Dsonar.sources=."
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                echo 'Running Container Security Scan with Trivy...'
                sh "trivy image --severity HIGH,CRITICAL ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying Securely to Kubernetes...'
                sh "kubectl apply -f deployment.yaml"
            }
        }
    }
}
