This bar composes the top frame of Contiamo UIs. [More Info](https://github.com/contiamo/operational-ui/issues/475).

## Usage

Below is the most common usage, across all of our apps at Contiamo.

```jsx
import * as React from "react"
import { HeaderBar, Logo, HeaderMenu, Avatar, ContextMenuProps } from "@operational/components"

const projects: ContextMenuProps["items"] = [
  { label: "Project 1" },
  { label: "Project 2" },
  { label: "Project 3" },
]
;<HeaderBar
  logo={<Logo name="Contiamo" />}
  main={
    <HeaderMenu withCaret items={projects}>
      Project 1
    </HeaderMenu>
  }
  end={
    <HeaderMenu items={[{ label: "My account" }, { label: "Log out" }]} align="right">
      Imogen Mason <Avatar name="Imogen Mason" />
    </HeaderMenu>
  }
/>
```
