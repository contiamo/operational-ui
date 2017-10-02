# Lean Dev Server

A dev server that lets you run a single showcase page as a standalone React app, using the original typescript files from all the packages. This removes the need to run multiple watchers while a component is being developed.

## Keeping in sync

As the packages change, it is crucial that this dev server stays in sync. Here is how:

* copy `dependencies`, `devDependencies`, `yarn.lock`, `public/index.html` and `types` over from `packages/showcase`.
* in `package.json`, remove Contiamo dependencies.
* in `index.html`, add an additional `<script src="/bundle.js"></script>` right before the closing `body` tag.