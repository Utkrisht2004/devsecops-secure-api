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
            steps {
                echo 'Running Static Code Analysis...'
                withSonarQubeEnv('sonar-server') {
                    sh """
                    sonar-scanner \
                      -Dsonar.projectKey=secure-system \
                      -Dsonar.sources=. \
                      -Dsonar.host.url=http://localhost:9000 \
                      -Dsonar.login=\$SONAR_TOKEN
                    """
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                echo 'Running Container Security Scan with Trivy...'
                // We will install Trivy on the server in the next step!
                sh "trivy image --severity HIGH,CRITICAL ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying Securely to Kubernetes...'
                // We will install Minikube/Kubectl on the server next!
                sh "kubectl apply -f deployment.yaml"
            }
        }
    }
}
