See `Sidenav` for usage examples in a broader context.

## Basic Usage

```jsx
import * as React from "react"
import {
  Sidenav,
  SidenavHeader,
  SidenavSeparator,
  SidenavItem,
  HomeIcon,
  FunctionIcon,
  DocumentIcon,
  ProjectIcon,
  AdminIcon,
  LockIcon,
  NoIcon,
  YesIcon,
} from "@operational/components"
;<div style={{ display: "flex" }}>
  <Sidenav compact>
    <SidenavHeader condensed icon={HomeIcon} label="Project Home" />
    <SidenavHeader label="The Prize">
      <SidenavItem
        items={[
          { label: <strong>Fabien</strong>, onClick: () => alert("hi i like robots") },
          {
            icon: ProjectIcon,
            label: "Cheese",
            onClick: () => alert("chicken"),
            items: Array.from({ length: 100 }, (_, i) => ({
              label: "Project " + (i + 1),
              onClick: () => alert("Slava is angry " + "😡".repeat(i + 1)),
            })),
          },
          { icon: AdminIcon, label: "Ice", onClick: () => alert("cream") },
        ]}
        onClick={() => alert("Overview")}
        label="Overview"
        icon={FunctionIcon || NoIcon}
      />
      <SidenavItem to="https://tejaskumar.com/" label="Use Cases" icon={DocumentIcon} />
      <SidenavItem onClick={() => alert("Guides")} label="Guides" icon={HomeIcon} />
    </SidenavHeader>
    <SidenavHeader label="Let It Snow">
      <SidenavItem label="Steak" icon={YesIcon} />
      <SidenavSeparator />
      <SidenavItem label="Frites" active icon={LockIcon} />
      <SidenavItem
        label="Rum"
        icon={NoIcon}
        items={[
          { label: <strong>Fabien</strong>, onClick: () => alert("hi i like robots") },
          {
            icon: ProjectIcon,
            label: "Cheese",
            onClick: () => alert("chicken"),
            items: Array.from({ length: 100 }, (_, i) => ({
              label: "Project " + (i + 1),
              onClick: () => alert("Slava is angry " + "😡".repeat(i + 1)),
            })),
          },
          { icon: AdminIcon, label: "Ice", onClick: () => alert("cream") },
        ]}
      />
    </SidenavHeader>
  </Sidenav>

  <div style={{ width: 100 }} />

  <Sidenav compact dark>
    <SidenavHeader condensed icon={HomeIcon} label="Project Home" />
    <SidenavHeader label="The Prize">
      <SidenavItem
        items={[
          { label: <strong>Fabien</strong>, onClick: () => alert("hi i like robots") },
          {
            icon: ProjectIcon,
            label: "Cheese",
            onClick: () => alert("chicken"),
            items: Array.from({ length: 100 }, (_, i) => ({
              label: "Project " + (i + 1),
              onClick: () => alert("Slava is angry " + "😡".repeat(i + 1)),
            })),
          },
          { icon: AdminIcon, label: "Ice", onClick: () => alert("cream") },
        ]}
        onClick={() => alert("Overview")}
        label="Overview"
        icon={FunctionIcon || NoIcon}
      />
      <SidenavItem to="https://tejaskumar.com/" label="Use Cases" icon={DocumentIcon} />
      <SidenavItem onClick={() => alert("Guides")} label="Guides" icon={HomeIcon} />
    </SidenavHeader>
    <SidenavHeader label="Let It Snow">
      <SidenavItem label="Steak" icon={YesIcon} />
      <SidenavSeparator />
      <SidenavItem label="Frites" active icon={LockIcon} />
      <SidenavItem
        label="Rum"
        icon={NoIcon}
        items={[
          { label: <strong>Fabien</strong>, onClick: () => alert("hi i like robots") },
          {
            icon: ProjectIcon,
            label: "Cheese",
            onClick: () => alert("chicken"),
            items: Array.from({ length: 100 }, (_, i) => ({
              label: "Project " + (i + 1),
              onClick: () => alert("Slava is angry " + "😡".repeat(i + 1)),
            })),
          },
          { icon: AdminIcon, label: "Ice", onClick: () => alert("cream") },
        ]}
      />
    </SidenavHeader>
  </Sidenav>
</div>
```

### Basic Usage

```jsx
import * as React from "react"
import { SidenavItem, UserIcon } from "@operational/components"
;<SidenavItem label="My Account" icon={UserIcon} />
```

### Active State

```jsx
import * as React from "react"
import { SidenavItem, UserIcon } from "@operational/components"
;<SidenavItem label="My Account" icon={UserIcon} active />
```

### As a link

```jsx
import * as React from "react"
import { SidenavItem, UserIcon } from "@operational/components"
;<SidenavItem dark to="https://www.tejaskumar.com/" label="My Account" icon={UserIcon} />
```
