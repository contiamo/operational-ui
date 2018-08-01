The splash component can be used to render a simple animated splash screen for a project. It is used internally by this package and by https://github.com/contiamo/operational-visualizations.

### Usage

```jsx
const initialState = {
  isOpen: false,
}
;<>
  {state.isOpen && (
    <Splash
      title="My Interesting Project"
      actions={
        <Button
          onClick={() => {
            setState(() => ({
              isOpen: false,
            }))
          }}
        >
          Dismiss this window
        </Button>
      }
    >
      <p>I made a software project. It is interesting for the following reasons:</p>
    </Splash>
  )}
  <Button
    color="primary"
    onClick={() => {
      setState(() => ({
        isOpen: true,
      }))
    }}
  >
    Open splash
  </Button>
</>
```
