Menus that drop down from the header bar, i.e. project selectors, and user menus.

### Usage

```jsx
const projectOptions = [
  { key: "project1", label: "Project 1" },
  { key: "project2", label: "Project 2" },
  { key: "project3", label: "Project 3" },
]

const userOptions = [
  { label: "My account", onClick: () => alert("Navigate to account") },
  { label: "Logout", onClick: () => alert("Logout") },
]

class ComponentWithHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = { project: { key: "project1", label: "Project 1" } }
  }

  onClick(project) {
    this.setState(() => ({ project }))
  }

  render() {
    return (
      <div style={{ display: "inline-block", backgroundColor: "#3e3e3e" }}>
        <HeaderMenu items={projectOptions} onClick={this.onClick.bind(this)} withCaret>
          {this.state.project.label}
        </HeaderMenu>
      </div>
    )
  }
}

;<ComponentWithHeader />
```
