<div align="center">
  <img width="120" height="120" src="/packages/showcase/static/favicons/__original.png" alt="Operational UI Logo">
  <h1>Operational UI</h1>
  <p>Building blocks for effective operational interfaces</p>
  <a href="https://travis-ci.org/Contiamo/operational-ui" target="_blank">
    <img src="https://img.shields.io/travis/Contiamo/operational-ui.svg" alt="Travis CI status">
  </a>
  <a href="https://github.com/prettier/prettier" target="_blank">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="Prettier">
  </a>
</div>

<!-- separator -->

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
// which does important setup work, and requires a single child element.
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
1. [Blocks](https://ui.contiamo.com/blocks) hold more state, more side effects, more opinions. They are our work-in-progress selection of widgets that worked well with client projects and which seemed like a good enough abstraction for a library.
1. [Visualizations](https://ui.contiamo.com/visualizations) are full-featured d3 apps, 
1. The [theme](https://github.com/Contiamo/operational-ui/tree/master/packages/theme) package exports a plain object you can use to customize the designs of components and visualizations.
1. [Utils](https://github.com/Contiamo/operational-ui/tree/master/packages/utils) contain helper methods for color manipulation, creating specific higher-order React components, and d3 helpers.
1. [Showcase](https://github.com/Contiamo/operational-ui/tree/master/packages/showcase) is the documentation website for the modules.

## Contributing

We look forward to your contribution and feedback. Simply open an issue or PR to open up a discussion. `Operational UI` adheres to the [Berlin Code of Conduct](http://berlincodeofconduct.org).

Below you find some guides on how to work with the codebase:

### Working on Operational UI

After you `npm install`, simply run `npm run dev` or `yarn dev` inside the `components` or `visualizations` packages. This spins up a dev server you can use to test packages, by editing the entry point at `./packages/{components,visualizations}/scripts/dev-server/site.tsx`.

To run the showcase, simply run `npm run start` or `yarn start` from root. 

To make sure your code is ready for Travis and your reviewers, run `npm run ci:local` or `yarn ci:local` from the root of the project.

#### Generators

To create a new `component`, simply run `./scripts/create-component.sh ComponentName`. This will generate all the boilerplate, files like `ComponentName.tsx` and `ComponentName.test.tsx`, and points to a few remaining manual wiring steps to get your component, its tests and its showcase page in place. The boilerplate also tries to guide towards consistent practices around code style, state management and styling. Please ask if anything is unclear.

<!-- separator -->

<h2 align="center">Core Team</h2>

<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/peterszerzo.png?s=150">
        <br>
        <a href="https://github.com/peterszerzo">Peter Szerzo</a>
        <p>Codebase Handyperson 🔥</p>
      </td>
      <td align="center" width="20%" valign="top">
        <img width="150" height="150" src="https://github.com/ImogenF.png?s=150">
        <br>
        <a href="https://github.com/ImogenF">Imogen Mason</a>
        <p>Visualizations Lead</p>
      </td>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/TejasQ.png?s=150">
        <br>
        <a href="https://github.com/TejasQ">Tejas Kumar</a>
        <p>Contributor + The Original Creator</p>
      </td>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/micha-f.png?s=150">
        <br>
        <a href="https://github.com/micha-f">Michael Franzkowiak</a>
        <p>Contributor</p>
      </td>
     </tr>
  </tbody>
</table>

Made with 🌵 at [Contiamo](https://contiamo.com).
