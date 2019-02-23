The `OperationalContext` component provides utility methods and data that can be used inside `OperationalUI`:

### Messages and Loaders

You can use `OperationalUI`'s flash- and progress bar features to automatically render and manage these universal UI elements using the `pushMessage` and `setLoadingState` methods provided in context, as shown in the code snippet below:

```jsx
import * as React from "react"
import { Button, useOperationalContext } from "@operational/components"

const ComponentWithContext = () => {
  const { pushMessage, setLoading, loading } = useOperationalContext()

  return (
    <div style={{ padding: 20 }}>
      <Button
        color="primary"
        onClick={() => {
          pushMessage({
            body: "Info message",
            type: "info",
          })
        }}
      >
        Create an info message
      </Button>
      <Button
        color="success"
        onClick={() => {
          pushMessage({
            body: "Success message",
            type: "success",
          })
        }}
      >
        Create a success message
      </Button>
      <Button
        color="error"
        onClick={() => {
          pushMessage({
            body: "Error message",
            type: "error",
          })
        }}
      >
        Create an error message
      </Button>
      <Button
        onClick={() => {
          setLoading(!loading)
        }}
      >
        Toggle loading state
      </Button>
    </div>
  )
}

;<ComponentWithContext />
```
