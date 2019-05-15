#!/usr/bin/env groovy
def lib = new contiamo.Methods()
lib.setEnvVars()

def label = env.JenkinsSlaveName
echo "Slave pod name: "+label

/////// List all the downstream projects here:///////
def downstreamProjects = ["labs-ui","pantheon-ui"]
////////////////////////////////////////////////////
def triggerJob(job,branch){
  println "Triggering ${job}/${branch}"
  build job: "../${job}/${branch}", wait: false
}
def npmLogin(registry,user,pass,email){
  sh """
  #!/bin/bash
  sed s/REGISTRY_PLACEHOLDER/${registry}/g -i /usr/local/bin/npm-login.sh
  /usr/local/bin/npm-login.sh ${user} ${pass} ${email}
  npm config set //$registry/:always-auth=true
  """
}
def npmPublish(tag,registry){
  sh """
  #!/bin/bash
  npm whoami --registry https://${registry}
  npm version \$(npm show . version)-\$(git rev-parse --short HEAD) --no-git-tag-version --registry https://${registry} --unsafe-perm
  (npm publish --tag next --registry https://${registry} && node ./lambdas/notify-slack-on-publish-next.js \$(npm show . version)-\$(git rev-parse --short HEAD)) || echo "Publish failed, possibly because the SHA is the same. Continuing..."
  """
}
def buildWebsite(dir,command){
  sh "cd ${dir} && yarn ${command} && cd -"
}

podTemplate(cloud: "${env.K8sCloud}", label: label, containers: [
  containerTemplate(name: 'node', image: "${env.GcrPrefix}/node:10.0.0-v0.5", ttyEnabled: true, nodeSelector: "group=highmem", privileged: true),
  containerTemplate(name: 'build-utils', image: "${env.GcrPrefix}/build-utils:0.0.8", ttyEnabled: true, nodeSelector: "group=highmem", privileged: true)
  ],
  volumes: [
      hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
      hostPathVolume(mountPath: '/tmp', hostPath: '/tmp'),
      secretVolume(secretName: 'jenkins-git-credentials', mountPath: '/home/jenkins/git'),
  ],
  envVars: [
    envVar(key: 'GIT_AUTHOR_EMAIL', value: 'jenkins-x@googlegroups.com'),
    envVar(key: 'GIT_AUTHOR_NAME', value: 'jenkins-x-bot'),
    envVar(key: 'GIT_COMMITTER_EMAIL', value: 'jenkins-x@googlegroups.com'),
    envVar(key: 'GIT_COMMITTER_NAME', value: 'jenkins-x-bot'),
    envVar(key: 'JENKINS_URL', value: 'http://jenkins:8080'),
    envVar(key: 'XDG_CONFIG_HOME', value: '/home/jenkins'),
    secretEnvVar(key: 'NPM_PASS', secretName: 'npm-registry-creds', secretKey: 'password'),
    secretEnvVar(key: 'NPM_USER', secretName: 'npm-registry-creds', secretKey: 'username')
  ]
)
{
  timestamps {
    ansiColor('xterm') {
      node(label){
        try {
          stage("Test Fails"){
            sh "jfuyfkuyfk"
          }
          stage('Git Checkout'){
            lib.gitCheckout()
          }
          container('node') {
            stage("Initialize"){
              sh "node -v && npm -v"
            }
            stage ('YARN Install'){
              try {
                sh "yarn install"
              } catch(e) {
                error("Failed while running npm install. Error: ${e}")
              }
            }
            stage ('Test'){
              try {
                sh "yarn ci"
              } catch(e) {
                error("Failed while running npm ci. Error: ${e}")
              }
            }
            env.NpmRegistry = "registry.npmjs.org"
            stage ('NPM Publish Next Tag') {
              env.NpmRegistry = "registry.npmjs.org"
              npmLogin(env.NpmRegistry,"\${NPM_USER}","\${NPM_PASS}",env.NpmEmail)
              try {
                npmPublish("next",env.NpmRegistry)
              } catch(e) {
                println("Error publishing artefacts. Error: ${e}. Trying again...")
                npmPublish("next",env.NpmRegistry)
              }
            }
            if (env.BranchLower == "master") {
              lib.haveAword('yellow',"Triggering downstream build")
              stage('Trigger Contiamo UI'){
                build(job: '../contiamo-ui/master', wait: false, parameters: [
                  [$class: 'StringParameterValue', name: 'UPDATE', value: "operational-ui" ]
                ])
              }
            }
          }
        } catch(Exception e) {
          container('build-utils'){
            lib.postToSlackV3(colour: "danger", channel: "greg", title: "${env.JobNameWithoutBranch} build failed", message: "Build URL: ${env.BUILD_URL}/console")
          }
          errorMessage = e.toString()
          println(errorMessage)
          error("Pipeline failed")
        }
      }
    }
  }
}
