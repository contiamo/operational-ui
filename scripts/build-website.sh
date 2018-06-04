#!/bin/sh

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
cp -r packages/components/styleguide ./dist/docs
