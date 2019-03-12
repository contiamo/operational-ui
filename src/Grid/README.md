A grid component with the following predefined options:

- 'IDE': a grid used to implement an IDE, with a narrow column on the left for the folder tree browser, and a wide one on the right for code.
- 'MxN': an M-by-N grid of any integers.

If you have other special needs, we recommend using the CSS grid directly, as these grid types are build on top of it.

### Usage

```jsx
import * as React from "react"
import { Grid, Card } from "@operational/components"

;<Grid type="2x2">
  <Card>One</Card>
  <Card>Two</Card>
  <Card>Three</Card>
  <Card>Four</Card>
</Grid>
```
