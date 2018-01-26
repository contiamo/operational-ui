# Operational UI Theme

The `@operational/theme` package is basically a structured plain JavaScript object that other `@operational` packages consume to customize their styling.

## Getting Started

Install the package via npm or yarn:

`npm install @operational/theme @operational/components`

Inspect and customize the theme object:

```js
import { operationalTheme } from "@operational/theme"

const ownTheme = {
  ...operationalTheme,
  colors: {
    ...operationalTheme.colors,
    success: "#0F0"
  }
}
```

Use this theme with e.g. `@operational/components`, like so:

```js
import React from "react"
import { OperationalUI, Button, ThemeProvider } from "@operational/components"

const App = () => {
  <OperationalUI, ThemeProvider theme={ownTheme}>
    <Button color="success">So much success</Button>
  </OperationalUI, ThemeProvider>
}
```

The background color of the button will now turn to what you specified.

## Documentation

Head to the theme section of the [documentation site](https://ui.contiamo.com/documentation/theming) to see an overview of what you can do with the theme.

