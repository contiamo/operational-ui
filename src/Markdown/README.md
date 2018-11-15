This component renders Markdown, Operational UI style.

# Basic Usage

```jsx
<Markdown
  value={`# Operational UI Components

The \`@operational/components\` package contains _simple_, **stateless** UI building blocks - your typical input fields, buttons, cards, grids, and so on. See [demo and docs](https://operational-ui.js.org/).

## Getting Started

Install the package via npm or yarn:

- npm install @operational/components

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
