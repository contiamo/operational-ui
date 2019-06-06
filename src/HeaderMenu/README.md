Menus that drop down from the header bar, i.e. project selectors, and user menus.

### Usage

```jsx
import * as React from "react"
import { HeaderMenu, ContextMenuProps, IconOrganization, IconProject, IconUser } from "@operational/components"

const projectOptions = [
  {
    icon: IconOrganization,
    iconColor: "primary",
    label: "Contiamo",
    description: "Organization-wide content and settings",
  },
  { label: "Project 1", icon: IconProject },
  { label: "Project 2", icon: IconProject },
  { label: "Project 3", icon: IconProject },
  {
    icon: IconProject,
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
