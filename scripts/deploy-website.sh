#!/bin/sh

build() {
  rm -rf dist
  cd packages/website
  yarn build
  cd ../..
  mv packages/website/dist .
  cd packages/visual-tests
  yarn build
  cd ../..
  mv packages/visual-tests/dist ./dist/visual-tests
  cd packages/components
  yarn docs:build
  cd ../..
  cp -r packages/styleguide ./dist/docs
}

deploy() {
  COMMIT_HASH=`git rev-parse --verify HEAD`
  git branch -D gh-pages
  git checkout --orphan gh-pages
  rm -rf scripts docs 
  cp -a dist/* .
  mv dist/visual-tests .
  rm -rf dist
  git add .
  git commit -m "Deploy Commit: ${COMMIT_HASH}" --no-verify
  git push -f origin gh-pages
  git checkout master
}

build
deploy
