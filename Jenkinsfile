pipeline {

    agent any

    stages {

        stage('get release') {

            steps {
                sshagent(credentials: ['ldap-alliance-automate']) {
                    sh '''
                        ls
                    '''
                }
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