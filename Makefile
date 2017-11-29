install: reset
	make clean
	npm install --registry=https://npm.contiamo.com/
	make bootstrap
	make build

reset:
	find . -name node_modules -prune -exec rm -rf {} \;
	find ./packages -maxdepth 2 -name lib -prune -exec rm -rf {} \;
	find ./packages -maxdepth 2 -name dist -prune -exec rm -rf {} \;

clean:
	rm -rf dist
	rm -rf lib

move-into-place:
	node ./scripts/move.js

build: clean
	./node_modules/.bin/tsc || :
	make move-into-place
	make clean

bootstrap:
	npm run bootstrap

postinstall: bootstrap
