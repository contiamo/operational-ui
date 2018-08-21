Sidenavs render a two-level hierarchical navigation element comprised of headers and items.

### Usage

<!-- -->

Typical usage includes `to` props to navigate and to manage highlighted/active state automatically.

```jsx
class StatefulSidenav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeHeaders: [1, 3],
    }
  }

  toggle(index) {
    this.setState(prevState => ({
      activeHeaders: prevState.activeHeaders.includes(index)
        ? prevState.activeHeaders.filter(headerIndex => headerIndex !== index)
        : [...prevState.activeHeaders, index],
    }))
  }

  render() {
    return (
      <div style={{ height: 400 }}>
        <Sidenav>
          <SidenavHeader condensed icon="Home" label="Project Home" />
          <SidenavHeader
            label="The Prize"
            active={this.state.activeHeaders.includes(1)}
            onToggle={this.toggle.bind(this, 1)}
          >
            <SidenavItem label="The First Prize" compactLabel="First" icon="Add" />
            <SidenavItem label="The Second Prize" compactLabel="Second" icon="Admin" />
            <SidenavItem label="No Short Label" icon="Bundle" />
          </SidenavHeader>
          <SidenavHeader
            label="Let It Snow"
            active={this.state.activeHeaders.includes(2)}
            onToggle={this.toggle.bind(this, 2)}
          >
            <SidenavItem label="The Fourth Prize" compactLabel="Fourth" icon="Catalog" />
            <SidenavItem label="The Fifth Prize" compactLabel="Fifth" icon="ChevronDown" />
            {/* No Icon case */}
            <SidenavItem label="The Sixth Prize" compactLabel="Sixth" />
          </SidenavHeader>
          <SidenavHeader
            label="Let It Snow"
            active={this.state.activeHeaders.includes(3)}
            onToggle={this.toggle.bind(this, 3)}
          >
            <SidenavItem label="The Seventh Prize" compactLabel="Seventh" icon="Document" />
            <SidenavItem label="The Eighth Prize" compactLabel="Eighth" icon="Endpoint" />
            <SidenavItem label="The Ninth Prize" compactLabel="Ninth" icon="Entity" />
          </SidenavHeader>
        </Sidenav>
      </div>
    )
  }
}

;<StatefulSidenav />
```

### Compact Mode

```jsx
<Sidenav compact>
  <SidenavHeader condensed icon="Home" label="Project Home" />
  <SidenavHeader label="The Prize">
    <SidenavItem label="Overview" icon="Function" />
    <SidenavItem label="Use Cases" icon="Funnel" />
    <SidenavItem label="Guides" icon="Home" />
  </SidenavHeader>
  <SidenavHeader label="Let It Snow">
    <SidenavItem label="Steak" icon="Jobs" />
    <SidenavItem label="Frites" active icon="Lock" />
    <SidenavItem label="Rum" icon="No" />
  </SidenavHeader>
</Sidenav>
```

### With a header placed at the bottom

```jsx
<div style={{ height: 600 }}>
  <Sidenav compact>
    <SidenavHeader label="Let It Snow">
      <SidenavItem label="Steak" icon="Jobs" />
      <SidenavItem label="Frites" active icon="Lock" />
    </SidenavHeader>
    <SidenavItem end label="Rum" icon="No" />
  </Sidenav>
</div>
```
