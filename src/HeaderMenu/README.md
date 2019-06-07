Menus that drop down from the header bar, i.e. project selectors, and user menus.

### Usage

```jsx
import * as React from "react"
import { HeaderMenu, ContextMenuProps, OrganizationIcon, ProjectIcon, UserIcon } from "@operational/components"

const projectOptions = [
  {
    icon: OrganizationIcon,
    iconColor: "primary",
    label: "Contiamo",
    description: "Organization-wide content and settings",
  },
  { label: "Project 1", icon: ProjectIcon },
  { label: "Project 2", icon: ProjectIcon },
  { label: "Project 3", icon: ProjectIcon },
  {
    icon: ProjectIcon,
    label: "Contiamo is a nice place and they have a nice UI library",
    description: "Organization-wide content and settings",
  },
]

const MyComponent = () => {
  const [project, setProject] = React.useState(projectOptions[0])

  return (
    <div style={{ display: "inline-block", height: 40, backgroundColor: "#3e3e3e" }}>
      <HeaderMenu items={projectOptions} onClick={setProject} withCaret>
        {typeof project !== "string" && (
          <>
            {React.createElement(project.icon, { left: true })}
            {project.label}
          </>
        )}
      </HeaderMenu>
    </div>
  )
}

;<MyComponent />
```
