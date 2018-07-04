Buttons are used heavily throughout an operational interface, and they often require a fair amount of customization. They exist independently or in groups, and can shrink to a condensed mode if space is short. These buttons can also take on any number of colors required.

### Simple usage

Using buttons is as simple as including the component with a text node as a child. Colors may be specified as hex strings, or as a pre-defined color key from the theme.

```jsx
<div style={{ marginBottom: 10 }}>
  <Button>Default</Button>
  <Button color="primary">Set color</Button>
  <Button color="#393939">Custom color</Button>
  <Button color="success" disabled>Disabled</Button>
  <Button disabled>Disabled</Button>
  <Button condensed>Condensed</Button>
</div>
<div style={{ marginBottom: 10 }}>
  <Button color="success" icon="Open">Icon</Button>
  <Button color="success" icon="Labs">Icon</Button>
  <Button condensed icon="Open">Icon</Button>
  <Button loading>Loading</Button>
</div>
<div style={{ marginBottom: 10 }}>
  <Button color="grey" disabled>Update</Button>
  <Button color="grey">Test</Button>
  <Button color="error">Delete this bundle</Button>
</div>
<div style={{ backgroundColor: "#1499ce", padding: 5 }}>
  <Button color="ghost">Ghost</Button>
  <Button color="ghost" icon="Open">Ghost with icon</Button>
  <Button color="ghost" icon="Open" condensed>Ghost condensed</Button>
</div>
```

### Usage with links

Using a `to` prop navigates automatically, and render proper anchor tags with hrefs. See `OperationalUI` docs for a one-time configuration you need to do to have pushstate navigation working out-of-the-box.

```jsx
<Button to="/some-url">Button One</Button>
```

### Full-width Buttons

```jsx
<Button fullWidth color="grey">
  I want to lose weight
</Button>
```
