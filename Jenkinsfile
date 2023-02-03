pipeline {

    agent any

    stages {

        stage('get release') {

            steps {

                //sh """apt-get install -y jq"""
                //sh """curl -LJO \$(curl -Ls https://api.github.com/repos/santiago123x/ethiopia_fertilize_system/releases/latest | jq -r '.assets[0].browser_download_url')"""
                sh """" curl -LJO \$(curl -Ls https://api.github.com/repos/santiago123x/ethiopia_fertilize_system/releases/latest | grep -o "browser_download_url": | sort -t- -k2n | tail -n1 """
            }
        }
    } 
}