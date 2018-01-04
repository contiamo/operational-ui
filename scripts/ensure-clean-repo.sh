#!/bin/sh
if [ -n "$(git status --porcelain | egrep -v '((\.lock)|(-lock\.json)|(\.log)|(\.map)|(\.d\.ts))$')" ]; then
  echo "!! REPO NOT CLEAN !! You are likely seeing this message because a CI script is trying to ensure that the files in this repo don't change when linter/prettifier/package scripts are run. Run npm run ci:local to smooth out these changes and commit again.";
  exit 1;
else
  echo "Repo is clean, as expected. OK!";
fi
