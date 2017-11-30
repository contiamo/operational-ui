# Very, very WIP
link:
	ln -s ~/Sites/contiamo-ui-components/packages/ui-theme ~/Sites/contiamo-ui-components/node_modules/contiamo-ui-theme
	ln -s ~/Sites/contiamo-ui-components/packages/ui-utils ~/Sites/contiamo-ui-components/node_modules/contiamo-ui-utils
	ln -s ~/Sites/contiamo-ui-components/packages/ui-blocks ~/Sites/contiamo-ui-components/node_modules/contiamo-ui-blocks
	ln -s ~/Sites/contiamo-ui-components/packages/ui-components ~/Sites/contiamo-ui-components/node_modules/contiamo-ui-components
	ln -s ~/Sites/contiamo-ui-components/packages/visualizations ~/Sites/contiamo-ui-components/node_modules/contiamo-visualizations

unlink:
	unlink node_modules/contiamo-ui-theme
	unlink node_modules/contiamo-ui-utils
	unlink node_modules/contiamo-ui-blocks
	unlink node_modules/contiamo-ui-components
	unlink node_modules/contiamo-visualizations

install: reset
	make clean
	npm install --registry=https://npm.contiamo.com/
	make bootstrap
	make build

reset:
	find . -name node_modules -prune -exec rm -rf {} \;
	find . -name lib -prune -exec rm -rf {} \;

clean:
	rm -rf dist
	rm -rf lib

move-into-place:
	node ./scripts/move.js

build: clean
	find ./packages -maxdepth 2 -name lib -prune -exec rm -rf {} \;
	find ./packages -maxdepth 2 -name dist -prune -exec rm -rf {} \;
	./node_modules/.bin/tsc || :
	make move-into-place
	make clean

bootstrap:
	npm run bootstrap

postinstall: bootstrap
	make build
