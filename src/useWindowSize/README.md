## Usage

This hook is used to get the window size and updates an element that uses it, providing the current size of the viewport.

```jsx
import * as React from "react"
import { Chip, useWindowSize } from "@operational/components"
const MyComponent = () => {
  const { width, height } = useWindowSize()

  return (
    <>
      Your window is <Chip color="success">{width}px</Chip> wide and <Chip>{height}px</Chip> high 🤘
    </>
  )
}

;<MyComponent />
```
