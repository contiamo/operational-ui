# [Contiamo UI](https://ui.contiamo.com)
### A UI library for data-driven applications.

This is a [monorepo](https://danluu.com/monorepo/) consisting of three interdependent, independent packages.
1. [UI Components](https://github.com/Contiamo/ui-components/tree/master/packages/ui-components)
1. [Showcase](https://github.com/Contiamo/ui-components/tree/master/packages/showcase)
1. [Utilities](https://github.com/Contiamo/ui-components/tree/master/packages/utils)

The utilities are the most basic package, providing helper functions to both `showcase` and `ui-components`. `showcase` makes use of `ui-components`, displaying each component alongside an interactive playground provided by [FormidableLabs' Component Playground](https://github.com/FormidableLabs/component-playground).

## Getting Started

### Dev Setup
We like yarn, but you're welcome to substitute npm's counterparts if you wish. To get set up,

`git clone git@github.com:Contiamo/ui-components.git`
`cd ui-components`
`yarn install` (you'll start getting instructions post-install)
`yarn bootstrap`👢
`yarn start`✈️ 

From that point, you'll be ready to go. Any changes you make in `packages/ui-components` or `packages/utils` will be reflected in the showcase, which should now be running at `http://localhost:8080/`. Happy coding! 🎉

### Consuming Components

Ideally, you would only use `ui-components` in your project, and let the `showcase` serve as [_living documentation_](https://ui.contiamo.com). `ui-components` depends on `utils`, which will be installed for you automatically.

So, getting started is as simple as `yarn add contiamo-ui-components`, or `npm install contiamo-ui-components`.

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
