Main provider for Operational UI. Should need to wrap all your application with this component.

### Classic example

```jsx static
<OperationalUI withBaseStyles>
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
          /*
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

### Setting up Message Management

You can use `OperationalUI`'s internal flash message feature to automatically render and manage messages by simply using the `pushMessage` method provided in context, as shown in the code snippet below:

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
            <div>
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
            </div>
          )}
        </OperationalContext>
      </OperationalUI>
    )
  }
}

;<MessageHandler />
```

### Render a confirm box (prompt)

`OperationalUI` supports rendering an opinionated confirm box through a method in its context.

```
// This import statement is necessary because of the wiring of this demo website.
// When using the library outside, use the following:
// `import { OperationalUI, OperationalContext, Button } from "@operational/components"`
const OperationalContext = require("../").OperationalContext

;<OperationalUI>
  <OperationalContext>
    {operationalContext => (
      <Button onClick={() => {
        operationalContext.confirm({
          title: "Are you sure",
          body: "This is a scary operation."
        })
      }}>Do something scary</Button>
    )}
  </OperationalContext>
</OperationalUI>
```

### Render a modal box

Modals are a more flexible alternative to the confirm box, that may contain anything, and are not tied to the cancel and confirm button structure.

```
// This import statement is necessary because of the wiring of this demo website.
// When using the library outside, use the following:
// `import { OperationalUI, OperationalContext, Button } from "@operational/components"`
const OperationalContext = require("../").OperationalContext

;<OperationalUI>
  <OperationalContext>
    {operationalContext => (
      <Button onClick={() => {
        operationalContext.modal({
          title: "This is a modal",
          body: (close) => <Button onClick={() => { close() }}>Close this modal</Button>
        })
      }}>Do something scary</Button>
    )}
  </OperationalContext>
</OperationalUI>
```
