## Usage

### Default

```jsx
initialState = {
  toggle: "visual",
}
;<Toggle
  value={state.toggle}
  onChange={value => setState({ toggle: value })}
  options={[{ label: "Visual", value: "visual" }, { label: "Code", value: "code" }]}
/>
```

### Condensed

```jsx
initialState = {
  toggle: "visual",
}
;<Toggle
  condensed
  value={state.toggle}
  onChange={value => setState({ toggle: value })}
  options={[{ label: "Visual", value: "visual" }, { label: "Code", value: "code" }]}
/>
```
