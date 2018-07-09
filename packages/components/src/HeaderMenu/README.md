Menus that drop down from the header bar, i.e. project selectors, and user menus.

## Usage

```jsx
const { ContextMenuItem } = require("../")

const projectOptions = [
  { key: "project1", value: "Project 1" },
  { key: "project2", value: "Project 2" },
  { key: "project3", value: "Project 3" },
]

const userOptions = [
  { value: "My account", onClick: () => alert("Navigate to account") },
  { value: "Logout", onClick: () => alert("Logout") },
]

class ComponentWithHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = { project: { key: "project1", value: "Project 1" } }
  }

  onClick(project) {
    this.setState(() => ({ project }))
  }

  render() {
    return (
      <HeaderBar
        logo={<ContiamoLogo />}
        main={
          <HeaderMenu items={projectOptions} onClick={this.onClick.bind(this)} carat>
            {this.state.project.value}
          </HeaderMenu>
        }
        end={
          <HeaderMenu items={userOptions} align="right">
            ImogenMason <Avatar name="Imogen Mason" />
          </HeaderMenu>
        }
      />
    )
  }
}

;<ComponentWithHeader />
```
