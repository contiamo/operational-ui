Menus that drop down from the header bar, i.e. project selectors, and user menus.

### Usage

```jsx
const projectOptions = [
  {
    key: "project1",
    icon: "Building",
    iconColor: "primary",
    label: "Contiamo",
    description: "Organization-wide content and settings",
  },
  { key: "project1", label: "Project 1" },
  { key: "project2", label: "Project 2" },
  { key: "project3", label: "Project 3" },
]

const userOptions = [
  { label: "My account", onClick: () => alert("Navigate to account") },
  { label: "Logout", onClick: () => alert("Logout") },
]

initialState = { project: { key: "project1", label: "Project 1" } }
;<div style={{ display: "inline-block", backgroundColor: "#3e3e3e" }}>
  <HeaderMenu items={projectOptions} onClick={project => setState(() => ({ project }))} withCaret>
    {state.project.label}
  </HeaderMenu>
</div>
```
