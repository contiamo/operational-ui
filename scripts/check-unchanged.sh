#!/bin/sh
if [ -n "$(git status --porcelain)" ]; then
  exit 1;
else
  echo "no changes";
fi
