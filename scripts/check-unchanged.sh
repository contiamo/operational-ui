#!/bin/sh
if [ -n "$(git status --porcelain | egrep -v '((\.lock)|(-lock\.json)|(\.log)|(\.map))$')" ]; then
  echo "changes";
  exit 1;
else
  echo "no changes";
fi
