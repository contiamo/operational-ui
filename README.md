<a href="https://travis-ci.org/Contiamo/operational-ui" target="_blank">
  <img src="https://img.shields.io/travis/Contiamo/operational-ui.svg" alt="Travis CI status">
</a>
<a href="https://github.com/prettier/prettier" target="_blank">
  <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="Prettier">
</a>

# Operational UI

Building blocks for effective operational interfaces

`Operational UI` is a set of building blocks optimized for UI's supporting operational decision-making. It does best when used for data-driven interfaces that assume familiarity through routine use, prioritizing compactness and space-efficiency. It implements a [design language](https://ui.contiamo.com/docs/design-guidelines) centered around [small effective differences](https://twitter.com/edwardtufte/status/450076034759524352) and an opinionated layout.

## Getting started

`Operational UI` has multiple packages covering different aspects of data-driven UI's , but you can cover most of your needs with `@operational/components`. This package contains stateless atomic building blocks all the way from buttons to a side navigation.

To install, simply grab the package via npm or yarn, along with `React` and `ReactDOM`:

`npm install @operational/components react react-dom`

Create your first simple UI like so:

```javascript
/*
 * Creating and rendering a simple UI with a single button
 */
import React from "react"
import { render } from "react-dom"
import { OperationalUI, Button } from "@operational/components"

// Always wrap your interface in the `OperationalUI` wrapper, 
// which does groundwork, applies base styles, and allows some 
// advanced customizations later. Note that it requires a single child element.
// See https://www.npmjs.com/package/@operational/components
const MyInterface = () => (
  <OperationalUI>
    <Button onClick={() => { alert("Hello!") }}>Say hello!</Button>
  </OperationalUI>
)

render(<MyInterface />, document.querySelector("#app"))
```

You have your first simple button. Head to our [getting started](https://ui.contiamo.com/getting-started) for more examples and live coding.

## Next Steps: the `@operational` Package Family

Operational UI is shipped as a [monorepo](https://danluu.com/monorepo/), with small packages covering various facets of data-driven UI's:
1. [Components](https://ui.contiamo.com/components), used in the example above, are the smallest and simplest building blocks, implemented as presentational, [controlled](https://reactjs.org/docs/forms.html#controlled-components) React components. Buttons, input fields, modals, date pickers, and the like.
1. [Visualizations](https://ui.contiamo.com/visualizations) are full-featured d3 apps, 
1. [Theme](https://github.com/Contiamo/operational-ui/tree/master/packages/theme) package exports a plain object you can use to customize the designs of components and visualizations.
1. [Utils](https://github.com/Contiamo/operational-ui/tree/master/packages/utils) contain helper methods for color manipulation, creating specific higher-order React components, and d3 helpers.

## Contributing

We look forward to your contribution and feedback. Simply open an issue or PR to open up a discussion. `Operational UI` adheres to the [Berlin Code of Conduct](http://berlincodeofconduct.org).

Below you find some guides on how to work with the codebase:

### Developing locally

To run the project locally, install dependencies and link internal packages by simply running `yarn install`.

Every package defines a `yarn start` command that spins off a dev server where you can test things out. In `components`, `visualizations` and `blocks`, the exploratory code can be found under `/packages/{package}/scripts/dev-server`. Dev servers are set up as simple [parcel](https://parceljs.org) projects.

### Semver

`Operational UI` follows semantic versioning for React props. There is a `deprecate` higher-order component that allows to deprecate old props with a warning, making sure the API doesn't break dependant projects even if it might cause layout issues.

### Publishing to `npm`

Simply run `npm run publish` from an up-to-date local master branch (privileges required).

### Publishing the demos

Simply run `yarn deploy:website` to publish all demos through the `gh-pages` repository (privileges required).

## License

MIT
