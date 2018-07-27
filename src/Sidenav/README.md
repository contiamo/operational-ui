Sidenavs render a two-level hierarchical navigation element comprised of headers and items.

### Usage

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
            <SidenavItem label="The First Prize" icon="Settings" />
            <SidenavItem label="The Second Prize" icon="Settings" />
            <SidenavItem label="The Third Prize" icon="Settings" />
          </SidenavHeader>
          <SidenavHeader
            label="Let It Snow"
            active={this.state.activeHeaders.includes(2)}
            onToggle={this.toggle.bind(this, 2)}
          >
            <SidenavItem label="The First Prize" icon="Settings" />
            <SidenavItem label="The Second Prize" icon="Settings" />
            <SidenavItem label="The Third Prize" icon="Settings" />
          </SidenavHeader>
          <SidenavHeader
            label="Let It Snow"
            active={this.state.activeHeaders.includes(3)}
            onToggle={this.toggle.bind(this, 3)}
          >
            <SidenavItem label="The First Prize" icon="Settings" />
            <SidenavItem label="The Second Prize" icon="Settings" />
            <SidenavItem label="The Third Prize" icon="Settings" />
          </SidenavHeader>
        </Sidenav>
      </div>
    )
  }
}

;<StatefulSidenav />
```
