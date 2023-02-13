pipeline {

    agent any

    stages {

        stage('get release') {

            steps {
                //sh """curl -LJO \$(curl -Ls https://api.github.com/repos/santiago123x/ethiopia_fertilize_system/releases/latest | jq -r '.assets[0].browser_download_url')"""
                sh """rm -r releaseApi.zip"""
                sh """rm -r releaseApi.zip.1"""
                sh """rm -r releaseApi.zip.2"""
                sh """rm -r releaseApi.zip.3"""
                sh """rm -r releaseApi.zip.4"""
            }
        }
    } 
}