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
  { key: "project1", label: "Project 1", icon: "User" },
  { key: "project2", label: "Project 2", icon: "Project" },
  { key: "project3", label: "Project 3", icon: "Project" },
]

initialState = { project: { key: "project1", label: "Project 1", icon: "Building" } }
;<div style={{ display: "inline-block", backgroundColor: "#3e3e3e" }}>
  <HeaderMenu items={projectOptions} onClick={project => setState(() => ({ project }))} withCaret>
    <Icon left name={state.project.icon} /> {state.project.label}
  </HeaderMenu>
</div>
```
