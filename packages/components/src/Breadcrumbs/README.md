Breadcrumbs are typically a series of links showing the path to a particular page, and linking to each parent. Operational UI's breadcrumbs add a few extra functionality, such as icon and context menu support.

### Usage

```jsx
<Breadcrumbs>
  <Breadcrumb>Home</Breadcrumb>
  <Breadcrumb>Page 1</Breadcrumb>
  <Breadcrumb>Subpage 1</Breadcrumb>
</Breadcrumbs>
```

### Usage with links

Using a `to` prop navigates automatically, and render proper anchor tags with hrefs. See `OperationalUI` docs for a one-time configuration you need to do to have pushstate navigation working out-of-the-box.

```jsx
<Breadcrumbs>
  <Breadcrumb to="/some-url">Home</Breadcrumb>
  <Breadcrumb>Page 1</Breadcrumb>
  <Breadcrumb>Subpage 1</Breadcrumb>
</Breadcrumbs>
```

### Usage with context menu
```jsx
const Breadcrumb = require("../Breadcrumb/Breadcrumb").default;
const ContextMenuItem =  require("../ContextMenuItem/ContextMenuItem").default;

<Breadcrumbs>
  <ContextMenu css={{ display: "inline-block", margin: 0 }}>
    <Breadcrumb icon="ChevronDown">Hello</Breadcrumb>
    <ContextMenuItem>Item 1</ContextMenuItem>
    <ContextMenuItem>Item 2</ContextMenuItem>
    <ContextMenuItem>Item 3</ContextMenuItem>
  </ContextMenu>
  <Breadcrumb>Good Bye</Breadcrumb>
</Breadcrumbs>
```
