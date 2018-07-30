The `OperationalContext` component provides utility methods and data that can be used inside `OperationalUI`:

### Window size

Child components can get access to window dimensions as follows:

```jsx
<OperationalUI>
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
