Sidenavs render a two-level hierarchical navigation element comprised of headers and items.

### Usage

Typical usage includes `to` props to navigate and to manage highlighted/active state automatically.

```jsx
<Sidenav>
  <SidenavHeader condensed icon="Home" label="Project Home" />
  <SidenavHeader label="The Prize">
    <SidenavItem label="The First Prize" icon="Settings" />
    <SidenavItem label="The Second Prize" icon="Settings" />
    <SidenavItem label="The Third Prize" icon="Settings" />
  </SidenavHeader>
  <SidenavHeader label="Let It Snow">
    <SidenavItem label="The First Prize" icon="Settings" />
    <SidenavItem label="The Second Prize" icon="Settings" />
    <SidenavItem label="The Third Prize" icon="Settings" />
  </SidenavHeader>
</Sidenav>
```
