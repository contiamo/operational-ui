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

To set up routing that is automatically wired up to the `to` props of linking components such as `Button`, `Breadcrumb`,`SidenavHeader` and `SidenavItem`, you only need to supply a single prop on this one component:

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

You can use `OperationalUI`'s internal flash message management by simply using the `pushMessage` method provided in context, as follows:

```jsx
const ContextConsumer = require("./OperationalUI").Consumer

class MessageHandler extends React.Component {
  render() {
    return (
      <OperationalUI __log key="abc">
        <ContextConsumer>
          {ctx => (
            <div>
              <Button
                color="primary"
                onClick={() => {
                  ctx.pushMessage({
                    body: "Info message",
                    type: "info",
                  })
                }}
              >
                Create an info message
              </Button>
              <Button
                color="error"
                onClick={() => {
                  ctx.pushMessage({
                    body: "Error message",
                    type: "error",
                  })
                }}
              >
                Create an error message
              </Button>
            </div>
          )}
        </ContextConsumer>
      </OperationalUI>
    )
  }
}

;<MessageHandler />
```
