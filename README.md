<div align="center">
  <img src="/packages/showcase/public/favicons/__original.png" alt="Operational UI Logo">
  <h1>Operational UI</h1>
  <p>Building blocks for effective operational interfaces</p>
  <a href="https://travis-ci.org/Contiamo/operational-ui" target="_blank">
    <img src="https://img.shields.io/travis/Contiamo/operational-ui.svg" alt="Travis CI status">
  </a>
  <a href="https://github.com/prettier/prettier" target="_blank">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="Prettier">
  </a>
</div>

This is a [monorepo](https://danluu.com/monorepo/) consisting of three interdependent, independent packages.
1. [Components](https://github.com/Contiamo/ui-components/tree/master/packages/components)
1. [Blocks](https://github.com/Contiamo/ui-components/tree/master/packages/blocks)
1. [Visualizations](https://github.com/Contiamo/ui-components/tree/master/packages/visualizations)
1. [Theme](https://github.com/Contiamo/ui-components/tree/master/packages/theme)
1. [Utils](https://github.com/Contiamo/ui-components/tree/master/packages/utils)
1. [Showcase](https://github.com/Contiamo/ui-components/tree/master/packages/showcase)

The utilities are the most basic package, providing helper functions to both `showcase` and `ui-components`. `showcase` makes use of `ui-components`, displaying each component alongside an interactive playground provided by [FormidableLabs' Component Playground](https://github.com/FormidableLabs/component-playground).

## Getting Started

### Dev Setup
We like yarn, but you're welcome to substitute npm's counterparts if you wish. To get set up,

- `git clone git@github.com:Contiamo/operational-ui.git`
- `cd operational-ui`
- `yarn install` (you'll start getting instructions post-install)
- `yarn bootstrap`👢
- `yarn start`✈️

From that point, you'll be ready to go. Any changes you make in `packages/ui-components` or `packages/utils` will be reflected in the showcase, which should now be running at `http://localhost:8080/`. Happy coding! 🎉

### Creating a new component

Simply run `./scripts/create-component.sh ComponentName`. This will generate all the boilerplate, files like `ComponentName.tsx` and `ComponentName.test.tsx`, and points to a few remaining manual wiring steps to get your component, its tests and its showcase page in place. The boilerplate also tries to guide towards consistent practices around code style, state management and styling. Please ask if anything is unclear.

### Consuming Components

Ideally, you would only use `components` in your project, and let the `showcase` serve as [_living documentation_](https://ui.contiamo.com). `ui-components` depends on `utils`, which will be installed for you automatically.

So, getting started is as simple as `yarn add operational-ui`, or `npm install operational-ui`.

Once installed, you will be able to import any component you require and use what you need right out of the box. It _JustWorks™_.

Please see the [full documentation](https://ui.contiamo.com) for more details.

#### Example
```javascript
import React from "react"
import { render } from "react-dom"
import { Button } from "contiamo-ui-components"

const myButton = (props) => <Button onClick={() => window.alert('Hello World!')}>{props.children}</Button>,
      myContainer = document.querySelector("#button-container")

render(<myButton>Say Hi!</myButton>, myContainer)
```
