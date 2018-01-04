# Operational UI Blocks

The `@operational/blocks` package builds on [@operational/components](https://github.com/Contiamo/operational-ui/tree/master/packages/components), delivering larger, opinionated pieces of UI that handle a fair bit of their own state or side effects.

## Getting Started

Install the package via npm or yarn:

`npm install @operational/blocks @operational/components`

It is likely you will be using blocks together with components, so we recommend installing them together.

Create your first `Filter` block-based application like so:

```js
import React from "react"
import { Filter } from "@operational/blocks"
import { Input, ThemeProvider, operationalTheme } from "@operational/components"

const App = () => {
  <ThemeProvider theme={operationalTheme}>
    <Filter>
      <Input id="field-1" value="Value 1" />
      <Input id="field-2" value="Value 2" />
      <DatePicker id="field-3" start="01-01-2018" />
    </Filter>
  </ThemeProvider>
}
```

This component interacts smoothly with data input components from `@operational/components` to render a filter summary, and add the fields themselves into a modal. See more at the [filter documentation page](http://ui.contiamo.com/blocks/filters).

## Documentation

Head to the blocks section of the [documentation site](https://ui.contiamo.com/blocks) to see what you can do with blocks.
