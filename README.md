<div align="center">
  <svg width="120" height="120" viewBox="0 0 200 200">
    <path d="M98,195.960938 C43.8976681,195.960938 0.0390625,152.102332 0.0390625,98 C0.0390625,43.8976681 43.8976681,0.0390625 98,0.0390625 C152.102332,0.0390625 195.960938,43.8976681 195.960938,98 C195.960938,152.102332 152.102332,195.960938 98,195.960938 Z M98,189.386378 C148.471303,189.386378 189.386378,148.471303 189.386378,98 C189.386378,47.5286971 148.471303,6.61362206 98,6.61362206 C47.5286971,6.61362206 6.61362206,47.5286971 6.61362206,98 C6.61362206,148.471303 47.5286971,189.386378 98,189.386378 Z"></path>
    <path d="M98,163.08814 C62.0528131,163.08814 32.9118603,133.947187 32.9118603,98 C32.9118603,62.0528131 62.0528131,32.9118603 98,32.9118603 C133.947187,32.9118603 163.08814,62.0528131 163.08814,98 C163.08814,133.947187 133.947187,163.08814 98,163.08814 Z M98,156.51358 C130.316158,156.51358 156.51358,130.316158 156.51358,98 C156.51358,65.683842 130.316158,39.4864199 98,39.4864199 C65.683842,39.4864199 39.4864199,65.683842 39.4864199,98 C39.4864199,130.316158 65.683842,156.51358 98,156.51358 Z"></path>
    <polygon points="55.57108 183.576605 49.8773444 180.289325 66.4701751 151.549699 72.1639107 154.836979"></polygon>
    <polygon points="131.542632 47.4350288 125.848896 44.1477491 143.110735 14.2493674 148.80447 17.5366472"></polygon>
  </svg>
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
