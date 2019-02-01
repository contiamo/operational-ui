### Usage

```jsx
initialState = {
  on: true,
}
;<Switch
  on={state.on}
  left="off"
  right="on"
  onChange={newOnState =>
    setState({
      on: newOnState,
    })
  }
/>
```
