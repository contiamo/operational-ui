# Operational UI Theme

<!-- separator -->

The `@operational/theme` package defines a set of styling constants in the form of a plain JavaScript object that other `@operational` packages consume to customize their styling.

## Getting Started

Install the package via npm or yarn:

`npm install @operational/theme` 

Inspect and customize the theme object:

```js
import { operational } from "@operational/theme"

const ownTheme = {
  ...operationalTheme,
  colors: {
    ...operationalTheme.colors,
    // Redefine the success color to a basic green
    success: "#0F0"
  }
}
```

Use this theme with e.g. `@operational/components`, like so:

`npm install @operational/components`

```js
import React from "react"
import { OperationalUI, Button, ThemeProvider } from "@operational/components"

const App = () => {
  <OperationalUI theme={ownTheme}>
    <Button color="success">So much success</Button>
  </OperationalUI>
}
```

The background color of the button will now turn to what you specified.

<!-- separator -->

## Documentation

Head to the theme section of the [documentation site](https://ui.contiamo.com/documentation/theming) to see an overview of what you can do with the theme.

