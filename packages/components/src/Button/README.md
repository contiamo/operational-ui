Buttons are used heavily throughout an operational interface, and they often require a fair amount of customization. They exist independently or in groups, and can shrink to a condensed mode if space is short. These buttons can also take on any number of colors required.

### Simple usage

Using buttons is as simple as including the component with a text node as a child. Colors may be specified as hex strings, or as a pre-defined color key from the theme.

```jsx
<Button>Default</Button>
<Button color="primary">Set color</Button>
<Button color="#393939">Custom color</Button>
<Button color="success" disabled>Disabled</Button>
<Button disabled>Disabled</Button>
<Button condensed>Condensed</Button>
<Button color="success" icon="ExternalLink">Icon</Button>
<Button condensed icon="ExternalLink">Icon</Button>
<Button loading>Loading</Button>
```

### Usage with links

Using a `to` prop navigates automatically, and render proper anchor tags with hrefs. See `OperationalUI` docs for a one-time configuration you need to do to have pushstate navigation working out-of-the-box.

```jsx
<Button color="info" to="/some-url">Button One</Button>
```
