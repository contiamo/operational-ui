This component renders Markdown, Operational UI style.

# Basic Usage

```jsx
<Markdown
  value={`# Operational UI Components

The \`@operational/components\` package contains _simple_, **stateless** UI building blocks - your typical input fields, buttons, cards, grids, and so on. See [demo and docs](https://operational-ui.js.org/).

> This project is structured as a Labs Bundle and you can edit using the labs edit command. Due to some current discrepencies between OpenFaaS and Labs, you can not test or deploy the function via Labs, this must be done directly with OpenFaaS.

## Getting Started

Install the package via npm or yarn:

- npm install @operational/components

## Checkbox for fun
Here we have a checkbox because we like checkboxes and stuff.

- [ ] this isn't
- [x] in the docs
- [ ] but the example
- [x] is nice to have

Create your first application like so:

\`\`\`js
import * as React from "react"
import { Button, OperationalUI } from "@operational/components"

// Always wrap your interface in the \`OperationalUI\` wrapper,
// which does important setup work, and takes a single child element.
// See https://www.npmjs.com/package/%40operational%2Fcomponents
const App = () => (
  <OperationalUI>
    <Button>Hello</Button>
  </OperationalUI>
)
\`\`\`

## A Random Table 🐔

No chickens were harmed in the making of this table. ❤️

| Chicken Part | Price | Word 1   | Word 2 | I don't even know anymore |
|--------------|-------|----------|--------|---------------------------|
| Leg          | 1eur  | This     | is     | the                       |
| Hand         | 2eur  | greatest | table  | of                        |
| Tail         | 3eur  | all      | time   | ye                        |

`}
/>
```

## Another Case

Here's another Markdown case, just for fun.

```jsx
<Markdown
  value={`### An h3 header ###

Now a nested list:

 1. First, get these ingredients:

      * carrots
      * celery
      * lentils

 2. Boil some water.

 3. Dump everything in the pot and follow
    this algorithm:

        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    Do not bump wooden spoon or it will fall.`}
/>
```
