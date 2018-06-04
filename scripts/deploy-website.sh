#!/bin/sh

COMMIT_HASH=`git rev-parse --verify HEAD`
git branch -D gh-pages
git checkout --orphan gh-pages
rm -rf scripts docs packages
cp -a dist/* .
mv dist/visual-tests .
mv dist/docs .
rm -rf dist
git add .
git add -f docs/build
git commit -m "Deploy Commit: ${COMMIT_HASH}" --no-verify
git push -f origin gh-pages
git checkout master
