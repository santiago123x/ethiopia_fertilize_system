pipeline {

    agent any

    stages {

        stage('get release') {

            steps {
                sh """"curl -LJO \$(curl -Ls https://api.github.com/repos/santiago123x/ethiopia_fertilize_system/releases/latest | grep -o 'browser_download_url:'"""
            }
        }
    } 
}