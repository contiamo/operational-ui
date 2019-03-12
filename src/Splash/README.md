The splash component can be used to render a simple animated splash screen for a project. It is used internally by this package and by https://github.com/contiamo/operational-visualizations.

### Usage

```jsx
import * as React from "react"
import { Splash, Button } from "@operational/components"

const MyComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return isOpen ? (
    <Splash
      color="primary"
      title="My Interesting Project"
      actions={<Button onClick={() => setIsOpen(false)}>Dismiss this window</Button>}
    >
      <p>I made a software project. Do you like it?</p>
    </Splash>
  ) : (
    <Button color="primary" onClick={() => setIsOpen(true)}>
      Open splash
    </Button>
  )
}

;<MyComponent />
```
