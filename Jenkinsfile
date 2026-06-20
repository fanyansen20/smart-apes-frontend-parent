 //below script is for Slack Notification, the script untested yet
def COLOR_MAP = [
    'SUCCESS': 'good', 
    'FAILURE': 'danger',
]

def build_url = "${env.JENKINS_URL}blue/organizations/jenkins/Smart-Apes%2F${env.JOB_BASE_NAME}/detail/${env.JOB_BASE_NAME}/${env.BUILD_NUMBER}/pipeline"

def web_url_Stage = "https://stage.smartapes.sg"

//Production Server
//def remoteLive = [:]
//remoteLive.name = 
//remoteLive.host = 
//remoteLive.allowAnyHosts = true

def remoteStage = [:]
remoteStage.name = "128.199.245.111"
remoteStage.host = "128.199.245.111"
remoteStage.allowAnyHosts = true


def verRegexs = ".*?(<<.*>>)-([^.]+).*" 

pipeline {
    agent {
        node {
            label 'jenkins-node-cloud'
        }
    } 
    parameters {
        /*string(name: 'buildEnv', defaultValue: 'staging')*/
        string(name: 'buildEnv', defaultValue: 'staging')
        string(name: 'pr_title', defaultValue: 'Example: <<1.0.73-B2B>>-master')
        string(name: 'release_version', defaultValue: 'example: backend-0.0.0-beta')
        string(name: 'release_timer', defaultValue: 'example: true or false')
        string(name: 'release_at', defaultValue: 'example: 2300 (on GTM+8)')
        string(name: 'test_release', defaultValue: 'example: true or false')
        string(name: 'module', defaultValue: '')
    }
    triggers {
       GenericTrigger(
            genericVariables: [
                 //[key: 'pr_title', value:'$.pr_title'], 
                 [key: 'pr_title', value:'$.pullrequest.title']
            ],
            genericRequestVariables: [
                 [key: 'buildEnv', regexpFilter: ''],
                 [key: 'release_version', regexpFilter: ''],
                 [key: 'project_id', regexpFilter: ''],
                 [key: 'release_id', regexpFilter: ''],
            ],
            // printContributedVariables: true,
            token: 'WTPA5Q06QFCAEIH95Z735P2XMKEX2',
            // causeString: 'Release from JIRA',
        )
    } 
    environment {
        DEPLOY = "$buildEnv"
        TEMP = "$pr_title".replaceAll(verRegexs, '$1')
        TEMP2 = "$env.TEMP".replaceAll("<", "").replaceAll(">", "")
        TARGET = "$pr_title".replaceAll(verRegexs, '$2')
        SERVER = "${env.DEPLOY == "staging" && env.TARGET == "master" ? "STAGING" : env.DEPLOY == "staging" && env.TARGET == "sandbox" ? "SANDBOX" : "LIVE"}".trim()
        VERSION = "${env.DEPLOY == "staging" ? "$env.TEMP2" : "$release_version"}".trim()        
        BRANCH = "${env.DEPLOY == "staging" && env.TARGET == "master" ? "master" : env.DEPLOY == "staging" && env.TARGET == "sandbox" ? "sandbox" : "production"}".trim()
        PROJECTID = "$project_id"
        RELEASEID = "$release_id"
    }
    stages {
        stage ('pre-build'){
            steps{
                echo "PR: ${pr_title}"     
                echo "Version: ${env.VERSION}"            
                echo "Enviroment: ${buildEnv}"
                script {
                    if(env.VERSION != 'no-build'){
                        if (env.DEPLOY == 'staging'){
                            def slackResponsePre = slackSend(channel: '#dev-notice-smart-apes',
                                color: "#0763a6",
                                message: "*STARTING:* Job *${env.JOB_NAME}* build *${env.DEPLOY}* <<${env.VERSION}>> & target branch *${env.TARGET}* is starting. More info at: <${build_url}|Build>")
                            slackResponsePre.addReaction("wrench")
                        }else if (env.DEPLOY == 'production'){
                            def slackResponsePre = slackSend(channel: '#dev-notice-smart-apes',
                                color: "#0763a6",
                                message: "*STARTING:* Job ${env.JOB_NAME} release automation <<${env.VERSION}>> is starting. More info at: <${build_url}|Log>")
                            slackResponsePre.addReaction("rocket")
                        }
                    }
                }
            }
        }
        
        stage ('Checkout Repo Master') {
        //please setup git repo and credential on pipeline config
        //checkout scm
            steps {
                catchError {
                    // checkout scm
                    checkout([
                    $class: 'GitSCM', branches: [[name: "*/${env.BRANCH}"]],
                    userRemoteConfigs: [[url: 'https://ilhamgrip@bitbucket.org/grip-batam/smart-apes-frontend-parent.git',credentialsId:'ffdd87eb-a4a9-4d31-b8ef-c8de22f22868']]
                    ])
                }
            }
        }
        
        stage ('Docker Build') {
        //this will build 2 image with tag Build ID number and tag latest
            steps {
                echo "Build new Docker Image : Smartapes-Frontend-parent"
                echo "BUILD ENV: $buildEnv"
                echo "ENV TARGET: ${env.TARGET}"
                echo "ENV DEPLOY: ${env.DEPLOY}"
                catchError {
                    script {          
                        sh 'docker system prune -af'              
                        if(env.VERSION != 'no-build'){
                            if (env.DEPLOY == 'staging' && env.TARGET == "master"){
                                echo "Build Docker Image because this is staging Pipeline"
                                docker.withRegistry('https://registry.digitalocean.com', 'GripRegistry') {
                                    def buildApp = docker.build("grip/smartapes-parent:${env.VERSION}", "--build-arg REACT_APP_MARKETPLACE_URL=https://stage.smartapes.sg --build-arg REACT_APP_SELLER_URL=https://stage.seller.smartapes.sg --build-arg REACT_APP_SERVER_API=https://stage.api.smartapes.sg/v1 --build-arg REACT_APP_VERSION=${env.VERSION} .")
                                    stage ('Publish Docker') {
                                        buildApp.push()
                                        buildApp.push('latest')
                                    }
                                }
                            }
                            else if (env.DEPLOY == 'staging' && env.TARGET == "sandbox"){
                                echo "Build new Docker Image : smartapes-parent:${env.VERSION}"
                                echo "Build Docker Image because this is staging Pipeline"
                                docker.withRegistry('https://registry.digitalocean.com', 'GripRegistry') {
                                    def buildApp = docker.build("grip/smartapes-parent:${env.VERSION}")
                                    stage ('Publish Docker') {
                                        buildApp.push('latest')
                                    }
                                }
                            }
                             else if (env.DEPLOY == 'production'){
                                docker.withRegistry('https://registry.digitalocean.com', 'GripRegistry') {
                                    def buildApp = docker.build("grip/smartapes-parent:${env.VERSION}","-f Dockerfile.prod .")
                                    stage ('Publish Docker') {
                                        buildApp.push()
                                    }
                                }
                            } 
                        }
                    }
                }
            }
        }
        
        
        stage ('Deploy to Server') {
            steps {
                catchError {
                    script{                                                
                        if(env.VERSION != 'no-build'){
                            if (env.DEPLOY == 'staging' && env.TARGET == "master"){
                                echo "Deploy to Staging"
                                withCredentials([usernamePassword(credentialsId: 'ssh-access-smartapes-staging', passwordVariable: 'password', usernameVariable: 'userName')]) {
                                    remoteStage.user = userName
                                    remoteStage.password = password
                                    sshCommand remote: remoteStage, command: "cd ~; if cd docker-compose; then git pull; else git clone https://steven-grip:aJuD4QwY2BzZy7pS5Muw@bitbucket.org/grip-batam/docker-compose.git; fi; cd SMARTAPES-PLATFORM/staging/frontend-parent; docker-compose pull; docker-compose down -v; docker-compose up -d"
                                }
                            }else if (env.DEPLOY == 'staging' && env.TARGET == "sandbox"){
                                echo "Deploy to Sandbox "
                                withCredentials([usernamePassword(credentialsId: '86ec2886-3964-488b-8f1b-df1724106a0a', passwordVariable: 'password', usernameVariable: 'userName'), string(credentialsId: 'doppler-secret-key-smartapes-parent-sanbox', variable: 'dopplerServiceKeyStaging')]) {
                                    remotesandbox.user = userName
                                    remotesandbox.password = password
                                    sshCommand remote: remotesandbox, command: "cd ~; if cd docker-compose; then git pull; else git clone https://steven-grip:aJuD4QwY2BzZy7pS5Muw@bitbucket.org/grip-batam/docker-compose.git; fi; cd SMARTAPES-PLATFORM/sandbox/frontend-parent; docker-compose pull; docker-compose down -v; DOPPLER_TOKEN_SMA_FRONTEND_parent=${dopplerServiceKeyStaging} docker-compose up -d"
                                }
                            }
                            else if (env.DEPLOY == 'production' ){
                                echo "Deploy to Production Cluster"

                                checkout([
                                $class: 'GitSCM', branches: [[name: "*/master"]],
                                userRemoteConfigs: [[url: 'https://ilhamgrip@bitbucket.org/grip-batam/smartapes-helm.git',credentialsId:'ffdd87eb-a4a9-4d31-b8ef-c8de22f22868']]
                                ])

                                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                                withCredentials([usernamePassword(credentialsId: 'ffdd87eb-a4a9-4d31-b8ef-c8de22f22868', passwordVariable: 'password_access', usernameVariable: 'userName')]) {
                                //def encodedPassword = URLEncoder.encode("$GIT_PASSWORD",'UTF-8')
                                sh "git config user.email ilhamgrip@bitbucket.org"
                                sh "git config user.name ilham"
                                //sh "git switch master"
                                sh "cat smartapes-app-helm/templates/frontend-parent/deployment.yaml"
                                sh "sed -i 's+registry.digitalocean.com/grip/smartapes-parent.*+registry.digitalocean.com/grip/smartapes-parent:${env.VERSION}+g' smartapes-app-helm/templates/frontend-parent/deployment.yaml"
                                sh "cat smartapes-app-helm/templates/frontend-parent/deployment.yaml"
                                sh "git add ."
                                sh "git commit -m 'Continues Delivery updated build in Jenkins Build No.${env.BUILD_NUMBER}: ${env.VERSION}'"
                                sh "git push https://ilhamgrip:${password_access}@bitbucket.org/grip-batam/smartapes-helm.git HEAD:master"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    post {
        success {            
            script {                                                
                if(env.VERSION != 'no-build'){
                    def slackResponseSuccess = slackSend(channel: '#dev-notice-smart-apes',
                        color: COLOR_MAP[currentBuild.currentResult],
                        message: "*${currentBuild.currentResult}:* Job *${env.JOB_NAME}* release <<${env.VERSION}>> is success and deploy to ${env.SERVER} server. More info at: <${build_url}|Logs>")
                    slackResponseSuccess.addReaction("tada")
                    if (env.DEPLOY == 'production'){
                        def releaseNoteUrl = "https://gripprinciple.atlassian.net/secure/ReleaseNote.jspa?projectId=${env.PROJECTID}&version=${env.RELEASEID}"
                        def slackReleaseNotes = slackSend(channel: '#proj-smartapes',
                            color: COLOR_MAP[currentBuild.currentResult],
                            message: "Successfully Release ${env.JOB_NAME} version ${env.VERSION} to Production Server. <${releaseNoteUrl}|Release Notes>")
                        slackReleaseNotes.addReaction("check")
                    }
                }
            }
        }
        failure {            
            script {                                                
                if(env.VERSION != 'no-build'){
                    def slackResponsFail = slackSend(channel: '#dev-notice-smart-apes',
                        color: COLOR_MAP[currentBuild.currentResult],
                        message: "*${currentBuild.currentResult}:* Job *${env.JOB_NAME}* release <<${env.VERSION}>> is failed. More info at: <${build_url}|Logs>")
                    slackResponsFail.addReaction("scream")
                }
            }
        }
        aborted {            
            script {                                                
                if(env.VERSION != 'no-build'){
                    def slackResponseAbort = slackSend(channel: '#dev-notice-smart-apes',
                        color: COLOR_MAP[currentBuild.currentResult],
                        message: "*${currentBuild.currentResult}:* Job *${env.JOB_NAME}* release <<${env.VERSION}>> is aborted. More info at: <${build_url}|Logs>")
                    slackResponseAbort.addReaction("warning")
                }
            }
        }
    } 
}