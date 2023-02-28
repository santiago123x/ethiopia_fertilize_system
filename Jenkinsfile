pipeline {

    agent any

    stages {
        stage('Ssh') {
            steps {
                script {
                    withCredentials(bindings: [sshUserPrivateKey(credentialsId: 'fertalizer_devops', keyFileVariable: 'SSH_KEY')]) {
                        def remote = [name: "Tesla", host: "172.30.1.117", user: "fertalizer", allowAnyHosts: true, identityFile: SSH_KEY]
                        sshCommand remote: remote, sudo: false, command: "ls"
                    }
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