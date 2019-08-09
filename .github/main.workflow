workflow "Compile and Publish" {
  on = "push"
  resolves = ["Publish"]
}

action "Install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "Build Icons" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install"]
  args = "run build:icons"
}

action "Compile" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install", "Build Icons"]
  args = "run build:package"
}

action "Filter for Master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
  needs = ["Compile"]
}

action "Package" {
  needs = "Filter for Master"
  uses = "actions/npm@master"
  args = "version $(npm show . version)-$(git rev-parse --short HEAD) --no-git-tag-version --unsafe-perm"
}

action "Publish" {
  needs = ["Install", "Build Icons", "Filter for Master", "Package"]
  uses = "actions/npm@master"
  args = "publish --tag next"
  secrets = ["NPM_AUTH_TOKEN"]
}
