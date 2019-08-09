workflow "Test TypeScript" {
  on = "push"
  resolves = ["Compile"]
}

action "Install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "install"
}

action "Compile" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install"]
  runs = "run tsc"
}

workflow "Publish to npm on merge to master" {
  on = "push"
  resolves = ["Publish"]
}

action "Filter for Master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
  needs = ["Compile"]
}

action "Package" {
  needs = "Filter for Master"
  uses = "actions/npm@master"
  args = "$(npm show . version)-$(git rev-parse --short HEAD) --no-git-tag-version --unsafe-perm"
  runs = "version"
}

action "Publish" {
  needs = "Package"
  uses = "actions/npm@master"
  args = "--tag next"
  secrets = ["NPM_AUTH_TOKEN"]
  runs = "publish"
}
