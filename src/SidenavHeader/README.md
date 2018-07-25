Used as headers (top-level links) inside a `Sidenav`.

### Usage

```jsx
<SidenavHeader label="Chapter One" />
```

### Usage with icon

```jsx
<SidenavHeader label="Chapter One" icon="User" />
```

### Usage with items

```jsx
<SidenavHeader label="Chapter One">
  <SidenavItem icon="Settings" label="Settings" />
  <SidenavItem icon="Terminal" label="Code" />
  <SidenavItem icon="User" label="Account" />
</SidenavHeader>
```

### Usage with links

Using a `to` prop navigates automatically, and render proper anchor tags with hrefs. See `OperationalUI` docs for a one-time configuration you need to do to have pushstate navigation working out-of-the-box.

```jsx
<SidenavHeader label="Chapter One" to="/one" />
```
