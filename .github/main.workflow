workflow "Compile and Publish" {
  on = "push"
  resolves = ["Publish"]
}

action "Install" {
  uses = "nuxt/actions-yarn@97f98f200b7fd42a001f88e7bdfc14d64d695ab2"
  args = "install"
}

action "Build Icons" {
  uses = "nuxt/actions-yarn@97f98f200b7fd42a001f88e7bdfc14d64d695ab2"
  needs = ["Install"]
  args = "build:icons"
}

action "Compile" {
  uses = "nuxt/actions-yarn@97f98f200b7fd42a001f88e7bdfc14d64d695ab2"
  needs = ["Install", "Build Icons"]
  args = "build:package"
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
