pipeline {

    agent any

    stages {
        stage('Ssh') {
            steps {
                withCredentials(bindings: [sshUserPrivateKey(credentialsId: 'devops_fertalizer_key', \
                                                             keyFileVariable: 'SSH_KEY')]) {
                  sshCommand remote: remote, command: "ls -lrt"
                }
            }
        }
        stage('Get release') {
            steps {
                sh """ls"""
                //sh """ls"""
                //sh """rm -fr src"""
                //sh """rm -fr releaseApi.zip"""
                //sh """curl -LJO \$(curl -Ls https://api.github.com/repos/santiago123x/ethiopia_fertilize_system/releases/latest | jq -r '.assets[0].browser_download_url')"""
                //sh """unzip -o releaseApi.zip"""
                //sh """rm -fr releaseApi.zip"""
                //sh """ls"""
            }
        }
    }
 
}