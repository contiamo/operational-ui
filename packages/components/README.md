# Operational UI Components

The `@operational/components` package contains simple, stateless UI building blocks - your typical input fields, buttons, cards, grids, and so on.

## Getting Started

Install the package via npm or yarn:

`npm install @operational/components`

Create your first application like so:

```js
import React from "react"
import { Button, OperationalUI } from "@operational/components"

const App = () => {
  <OperationalUI>
    <Button>Hello</Button>
  </OperationalUI>
}
```

Wrapping your component inside an `OperationalUI` is mandatory, and does important setup work. Note this component can only have a single child.

## Documentation

Head to the components section of the [documentation site](https://ui.contiamo.com/components) to see what you can do with components.

