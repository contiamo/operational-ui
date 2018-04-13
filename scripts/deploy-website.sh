#!/bin/sh

build() {
  rm -rf dist
  cd packages/website
  yarn build
  cd ../..
  mv packages/website/dist .
}

deploy() {
  git branch -D gh-pages
  git checkout --orphan gh-pages
  rm -rf scripts docs 
  mv dist/index.html .
  mv dist/static .
  mv dist/favicons .
  rm -rf dist
  git add .
  git commit -m "Deploy" --no-verify
  git push -f origin gh-pages
}

build
deploy
