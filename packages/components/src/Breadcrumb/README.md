The `Breadcrumb` component is nested inside the `<Breadcrumbs/>` to provide breadcrumb navigation. Note that in-between slashes are interspersed automatically.

### Usage

```jsx
<Breadcrumb>Home</Breadcrumb>
```

### Usage with links

Using a `to` prop navigates automatically, and render proper anchor tags with hrefs. See `OperationalUI` docs for a one-time configuration you need to do to have pushstate navigation working out-of-the-box.

```jsx
<Breadcrumb to="/some-url">Home</Breadcrumb>
```
