Main provider for Operational UI. Should need to wrap all your application with this component.

### Classic example

```jsx static
<OperationalUI>
  <App />
</OperationalUI>
```

### With personal theme example

```jsx static
<OperationalUI theme={myTheme}>
  <App />
</OperationalUI>
```

### Setting up routing

To set up routing that is automatically wired up to the `to` props of all nested linking components such as `Button`, `Breadcrumb`,`SidenavHeader` and `SidenavItem`, you only need to supply a single prop on this one component:

```jsx
class RoutingComponent extends React.Component {
  constructor(props) {
    super(props)
    // Set the initial path instate
    this.state = {
      path: window.location.pathname,
    }
  }

  render() {
    return (
      <OperationalUI
        pushState={newPath => {
          /**
           * This is a simple way to persist path changes in state.
           * Routing libraries like `react-router` do this automatically,
           * so if you have access to its `history` object, you can simply do
           * `<OperationalUI pushState={history.push} />`
           */
          this.setState(() => ({
            path: newPath,
          }))
          window.history.pushState(null, null, newPath)
        }}
      >
        <div>
          <p>{`The path is ${this.state.path}`}</p>
          <Button to="/abcd">Go to /abcd</Button>
        </div>
      </OperationalUI>
    )
  }
}

;<RoutingComponent />
```

### Window size

This component keeps track of the window size and makes it available through context, as in the snippet below:

```jsx
// This import statement is necessary because of the wiring of this demo website.
// When using the library outside, use the following:
// `import { OperationalUI, OperationalContext } from "@operational/components"`
const OperationalContext = require("../").OperationalContext
;<OperationalUI>
  <OperationalContext>
    {operationalContext => (
      <p>{`The viewport is ${operationalContext.windowSize.width} pixels wide and ${
        operationalContext.windowSize.height
      } tall.`}</p>
    )}
  </OperationalContext>
</OperationalUI>
```

### Messages and Loaders

You can use `OperationalUI`'s flash- and progress bar features to automatically render and manage these universal UI elements using the `pushMessage` and `setLoadingState` methods provided in context, as shown in the code snippet below:

```jsx
// This import statement is necessary because of the wiring of this demo website.
// When using the library outside, use the following:
// `import { OperationalUI, OperationalContext, Button } from "@operational/components"`
const OperationalContext = require("../").OperationalContext

class MessageHandler extends React.Component {
  render() {
    return (
      <OperationalUI>
        <OperationalContext>
          {operationalContext => (
            <div style={{ padding: 20 }}>
              <Button
                color="primary"
                onClick={() => {
                  operationalContext.pushMessage({
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
                  operationalContext.pushMessage({
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
                  operationalContext.pushMessage({
                    body: "Error message",
                    type: "error",
                  })
                }}
              >
                Create an error message
              </Button>
              <Button
                onClick={() => {
                  operationalContext.setLoading(!operationalContext.loading)
                }}
              >
                Toggle loading state
              </Button>
            </div>
          )}
        </OperationalContext>
      </OperationalUI>
    )
  }
}

;<MessageHandler />
```
