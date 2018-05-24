#!/usr/bin/env groovy
def label = "jenkins-node-${UUID.randomUUID().toString()}"

env.K8sCloud = "kubernetes"
env.GcpProject = "dev-and-test-env"
env.GcrRegion = "eu.gcr.io"
env.GcrPrefix = "${env.GcrRegion}/${env.GcpProject}"
env.BranchLower = env.BRANCH_NAME.toLowerCase()
env.NpmRegistry = "registry.npmjs.com"
env.NpmEmail = "contiamo@contiamo.com"

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
  npm --registry https://${registry} whoami
  npm run publish -- --canary --npm-tag=${tag} --skip-git --yes --registry https://${registry}
  """
}
def buildWebsite(dir,command){
  sh "cd ${dir} && yarn ${command} && cd -"
}

podTemplate(cloud: "${env.K8sCloud}", label: label, containers: [
  containerTemplate(name: 'node', image: "${env.GcrPrefix}/node:10.0.0-v0.5", ttyEnabled: true, resourceRequestMemory: '10Gi', resourceRequestCpu: '3', privileged: true),
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
  node(label){
    stage('Git Checkout'){
      checkout scm
      checkout ([ $class: 'GitSCM', branches: [[name: "*/${env.BranchLower}"]],         
        extensions: [[$class: 'LocalBranch', localBranch: env.BranchLower]], 
      ])
    }
    container('node') {
      stage ('YARN Install'){
        try {
          sh "yarn install"
        } catch(e) {
          error("Failed while running npm install. Error: ${e}")
        }
      }      
      stage ('Yarn Verify'){
        try {
          sh """            
          #!/bin/bash
          yarn verify
          """
        } catch(e) {
          error("Failed while running LERNA. Error: ${e}.")          
        }     
      }      
      stage ('NPM Publish Next Tag') {
        npmLogin(env.NpmRegistry,"\${NPM_USER}","\${NPM_PASS}",env.NpmEmail)
        try {
          npmPublish("next",env.NpmRegistry)
        } catch(e) {
          println("Error publishing artefacts. Error: ${e}. Trying again...")
          npmPublish("next",env.NpmRegistry)
        }
      }      
      stage ('Trigger Downstream') {
        // Triggering downstream projects:
        if (env.BranchLower == 'master') {
          downstreamProjects.each {
            triggerJob("${it}","next" )
          }
        } 
      }
    }
  }
}