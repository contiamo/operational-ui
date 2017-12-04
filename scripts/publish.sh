# Draft
# @todo: finish
npm run preversion
node_modules/.bin/lerna publish --skip-npm
cd packages/ui-components
npm publish --registry=https://npm.contiamo.com
