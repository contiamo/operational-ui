#!/bin/sh

build() {
  cd packages/website
  yarn build
  cd ../..
  mv packages/website/dist .
}

deploy() {
  git branch -D gh-pages
  git checkout --orphan gh-pages
  rm -rf packages scripts docs 
}

build
