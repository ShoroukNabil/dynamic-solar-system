pipeline {
    agent any

    environment {
        IMAGE_NAME = "shoroukimage/dynamic-solar-system"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        ARGO_REPO_URL = "git@github.com:ShoroukNabil/argocd-dynamic-solar-system.git"
        ARGO_REPO_DIR = "argocd-repo"
        MANIFEST_PATH = "solar-system/deployment.yaml"
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                sh """
                    git config --global user.email "eng.shnabil@gmail.com"
                    git config --global user.name "Jenkins GitOps Bot"
                """
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                        echo "Building image..."
                        docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                    """
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-creds', 
                        usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {

                        sh """
    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
    docker push ${IMAGE_NAME}:${IMAGE_TAG}
                """
                    }
                }
            }
        }

        stage('Clone ArgoCD Repo') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'git-creds-username', 
                        usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {

                       sh """
                            rm -rf ${ARGO_REPO_DIR}
                            git clone https://${GIT_USER}:${GIT_PASS}@github.com/ShoroukNabil/argocd-dynamic-solar-system.git ${ARGO_REPO_DIR}
                        """

                    }
                }
            }
        }

        stage('Update Manifests') {
            steps {
                script {
                    echo "Updating image tag inside manifests..."

                    sh """
                        cd ${ARGO_REPO_DIR}

                        sed -i 's|image: .*|image: ${IMAGE_NAME}:${IMAGE_TAG}|g' ${MANIFEST_PATH}
                    """
                }
            }
        }

        stage('Commit & Push Changes to ArgoCD Repo') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'git-creds', 
                        usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {

                        sh """
                            cd ${ARGO_REPO_DIR}
                            sed -i 's#image: .*#image: ${IMAGE_NAME}:${IMAGE_TAG}#g' ${MANIFEST_PATH}
                            
                            if git diff --quiet; then
                                echo "No changes to commit"
                                exit 0
                            fi
                            
                            git add .
                            git commit -m "Update image tag to ${IMAGE_TAG}"
                            git push https://${GIT_USER}:${GIT_PASS}@github.com/ShoroukNabil/argocd-dynamic-solar-system.git HEAD:main
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ CD pipeline completed successfully."
        }
        failure {
            echo "❌ Pipeline failed."
        }
    }
}
