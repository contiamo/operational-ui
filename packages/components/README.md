# Operational UI Components

The `@operational/components` package contains simple, stateless UI building blocks - your typical input fields, buttons, cards, grids, and so on.

## Getting Started

Install the package via npm or yarn:

`npm install @operational/components`

Create your first application like so:

```js
import React from "react"
import { Button, ThemeProvider, operationalTheme } from "@operational/components"

const App = () => {
  <ThemeProvider theme={operationalTheme}>
    <Button>Hello</Button>
  </ThemeProvider>
}
```

## Documentation

Head to the components section of the [documentation site](https://ui.contiamo.com/components) to see what you can do with components.

