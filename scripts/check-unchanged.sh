#!/bin/sh
if [ -n "$(git status --porcelain | egrep -v '.*(\.|-)lock(\.json)?$')" ]; then
  echo "changes";
  exit 1;
else
  echo "no changes";
fi
