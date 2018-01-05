#!/bin/bash
cd packages/showcase
npm run build
cd ../..
git branch -D gh-pages
git checkout --orphan gh-pages
mv packages/showcase/out/* .
rm -rf packages lerna.json docs yarn.lock scripts
git add .
git commit -m "Publish showcase page" --no-verify
git push -f origin gh-pages



