Sidenavs render a two-level hierarchical navigation element comprised of headers and items.

### Usage

Typical usage includes `to` props to navigate and to manage highlighted/active state automatically.

```jsx
<Sidenav>
  <SidenavHeader to="/one" label="The Prize">
    <SidenavItem label="The First Prize" icon="Settings" to="/one/1" />
    <SidenavItem label="The Second Prize" icon="Settings" to="/one/2" />
    <SidenavItem label="The Third Prize" icon="Settings" to="/one/3" />
  </SidenavHeader>
  <SidenavHeader label="Let It Snow" to="/two">
    <SidenavItem label="The First Prize" icon="Settings" to="/two/1" />
    <SidenavItem label="The Second Prize" icon="Settings" to="/two/2" />
    <SidenavItem label="The Third Prize" icon="Settings" to="/two/3" />
  </SidenavHeader>
</Sidenav>
```
