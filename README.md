<div align="center">
  <img width="120" height="120" src="/packages/showcase/public/favicons/__original.png" alt="Operational UI Logo">
  <h1>Operational UI</h1>
  <p>Building blocks for effective operational interfaces</p>
  <a href="https://travis-ci.org/Contiamo/operational-ui" target="_blank">
    <img src="https://img.shields.io/travis/Contiamo/operational-ui.svg" alt="Travis CI status">
  </a>
  <a href="https://github.com/prettier/prettier" target="_blank">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="Prettier">
  </a>
</div>

`Operational UI` is an opinionated set of building blocks designed to best support user interfaces used for operational decision-making.

This is a [monorepo](https://danluu.com/monorepo/) consisting of the following packages.
1. [Components](https://github.com/Contiamo/operational-ui/tree/master/packages/components) are the smallest and simplest building blocks, implemented as presentational, heavily [controlled](https://reactjs.org/docs/forms.html#controlled-components) React components. Buttons, input fields, modals, date pickers, and the like.
1. [Blocks](https://github.com/Contiamo/operational-ui/tree/master/packages/blocks) hold more state, more side effects, more opinions. They are our work-in-progress selection of widgets that worked well with client projects and which seemed like a good enough abstraction for a library.
1. [Visualizations](https://github.com/Contiamo/operational-ui/tree/master/packages/visualizations) are full-featured d3 apps, 
1. The [theme](https://github.com/Contiamo/operational-ui/tree/master/packages/theme) package exports a plain object you can use to customize the designs of components and visualizations.
1. [Utils](https://github.com/Contiamo/operational-ui/tree/master/packages/utils) contain helper methods for color manipulation, creating specific higher-order React components, and d3 helpers.
1. [Showcase](https://github.com/Contiamo/operational-ui/tree/master/packages/showcase) is the documentation website for the modules.

## Usage

Here is the minimal setup work required to get going with `Operational UI`:

```javascript
import React from "react"
import { render } from "react-dom"
import { ThemeProvider, Button, operationalTheme } from "@operational/components"

const MyInterface = () => (
  // Theme provider is mandatory
  <ThemeProvider theme={operationalTheme}>
    <Button onClick={() => {alert("Hello!")}}>Say hello!</Button>
  </ThemeProvider>
)

render(<MyInterface />, document.querySelector("#app"))
```

Why mandate the `ThemeProvider`? We wanted to make theming as explicit as possible, and make library users to work with the theme right from the start. Tweaking the interface should always start with poking around the theme object and seeing if modifications made there can get the look you need. Adding custom styles and overrides to components should come as a second consideration, used only sparingly.

## Working on Operational UI

After you install dependencies, simply run `npm run dev` or `yarn dev` inside the `components` or `visualizations` packages. This spins up a dev server you can use to test packages, by editing the entry point at `./packages/{components,visualizations}/scripts/dev-server/site.tsx`.

To run the showcase, simply run `npm run start` or `yarn start` from root. 

To make sure your code is ready for Travis and your reviewers, run `npm run ci:local` or `yarn ci:local` from the root of the project.

### Generators

To create a new `component`, simply run `./scripts/create-component.sh ComponentName`. This will generate all the boilerplate, files like `ComponentName.tsx` and `ComponentName.test.tsx`, and points to a few remaining manual wiring steps to get your component, its tests and its showcase page in place. The boilerplate also tries to guide towards consistent practices around code style, state management and styling. Please ask if anything is unclear.

More generators coming soon..

## Contributing

We look forward to your contribution, and we would like to assure you that we value all thoughts, feedback and PR contribution. Simply open an issue or PR to open up a discussion.

`Operational UI` adheres to the [Berlin Code of Conduct](http://berlincodeofconduct.org).

<h2 align="center">Core Team</h2>

<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/peterszerzo.png?s=150">
        <br>
        <a href="https://github.com/peterszerzo">Peter Szerzo</a>
        <p>General Codebase<br/>Handyperson</p>
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
        <p>The Original Creator</p>
      </td>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/Angarsk8.png?s=150">
        <br>
        <a href="https://github.com/Angarsk8">Andrés García</a>
        <p>Contributor</p>
      </td>
     </tr>
  </tbody>
</table>

Made with ❤️ and 🌵 at [Contiamo](https://contiamo.com).
