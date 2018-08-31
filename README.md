# Operational UI Components

[![Greenkeeper badge](https://badges.greenkeeper.io/contiamo/operational-ui.svg)](https://greenkeeper.io/)

The `@operational/components` package contains simple, stateless UI building blocks - your typical input fields, buttons, cards, grids, and so on. See [demo and docs](https://operational-ui.js.org/).

## Getting Started

Install the package via npm or yarn:

`npm install @operational/components`

Create your first application like so:

```js
import * as React from "react"
import { Button, OperationalUI } from "@operational/components"

// Always wrap your interface in the `OperationalUI` wrapper,
// which does important setup work, and takes a single child element.
// See https://www.npmjs.com/package/%40operational%2Fcomponents
const App = () => (
  <OperationalUI>
    <Button>Hello</Button>
  </OperationalUI>
)
```
