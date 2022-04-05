pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
                sh "sudo npm install"
                sh "sudo npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "sudo npm run start"
                sh "sudo cp -r ${WORKSPACE}/.next/ /var/www/jenkins-react-app/"
            }
        }
    }
}