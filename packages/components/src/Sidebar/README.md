The sidebar is a dynamic list-style navigational element with a large number of navigational elements and nested link structures in mind. This component involves composition of two types of elements, SidebarHeaders and SidebarItems, within the container Sidebar component.

Both headers and items can be wrapped inside anchor tags or React Router-style links to give them hyperlink functionality, which is not included directly into the implementation.

### Usage

A simple, purely presentational use looks like this:

```jsx
<Sidebar>
  <SidebarHeader label="Links">
    <SidebarItem onClick={() => {alert("Hello!")}}>Link 1</SidebarItem>
    <SidebarItem>Link 2</SidebarItem>
  </SidebarHeader>
  <SidebarHeader label="Links 2" open>
    <SidebarItem active>Link 3</SidebarItem>
    <SidebarItem>Link 4</SidebarItem>
  </SidebarHeader>
</Sidebar>
```

The following snippet shows interactivity and deeper nesting:

```jsx
class StatefulSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }
  
  render() {
    return (
      <Sidebar>
        <SidebarHeader
          label="Links"
          open={this.state.isOpen}
          onToggle={() => {
            this.setState(prevState => ({
              isOpen: !prevState.isOpen
            }))
          }}
        >
          <SidebarItem onClick={() => {alert("Hello!")}}>Link 1</SidebarItem>
          <SidebarItem>Link 2</SidebarItem>
        </SidebarHeader>
        <SidebarHeader label="Links 2" open>
          <SidebarHeader label="Links 2 2" open>
            <SidebarItem>Link 3</SidebarItem>
          </SidebarHeader>
          <SidebarItem>Link 4</SidebarItem>
        </SidebarHeader>
      </Sidebar>
    )
  }
};

<StatefulSidebar />
```
