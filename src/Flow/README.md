# Usage

```js
import React from "react"
import { Flow, YesIcon, UserIcon, UndoIcon } from "@operational/components"
;<Flow
  items={[
    {
      label: "Yes",
      icon: YesIcon,
      iconColor: "primary",
    },
    {
      label: "People",
      icon: UserIcon,
      iconColor: "primary",
    },
    {
      label: "History",
      icon: UndoIcon,
      iconColor: "primary",
    },
    {
      label: "Troy",
      icon: UserIcon,
      iconColor: "primary",
    },
  ]}
/>
```

# Condensed mode

To condense your items, simply add a condensed prop!

```js
import React from "react"
import { Flow, SyncIcon, UnlockIcon, PhysicalTableIcon, SortDescendingIcon } from "@operational/components"
;<Flow
  condensed
  items={[
    {
      icon: UnlockIcon,
    },
    {
      icon: SyncIcon,
      iconColor: "#fa0",
    },
    {
      icon: PhysicalTableIcon,
      iconColor: "#0af",
    },
    {
      icon: SortDescendingIcon,
      iconColor: "#f0f",
    },
  ]}
/>
```

# Controlled

`Flow` components can be controlled, and do things on click &mdash; like navigating to a new page or similar like so.

```js
import React from "react"
import {
  Flow,
  Title,
  SortAscendingIcon,
  ShareIcon,
  SearchIcon,
  VirtualDatabaseIcon,
  SortDescendingIcon,
} from "@operational/components"

const MyComponent = () => {
  const [route, setRoute] = React.useState(0)

  return (
    <>
      <Title>Active Item Index: {route}</Title>
      <Flow
        condensed
        activeItemIndex={route}
        items={[
          {
            icon: SortAscendingIcon,
            onClick: () => setRoute(0),
          },
          {
            icon: ShareIcon,
            onClick: () => setRoute(1),
          },
          {
            icon: SearchIcon,
            onClick: () => setRoute(2),
          },
          {
            icon: VirtualDatabaseIcon,
            onClick: () => setRoute(3),
          },
        ]}
      />
      <Flow
        activeItemIndex={route || 0}
        items={[
          {
            label: "Loss",
            icon: SortDescendingIcon,
            onClick: () => setRoute(0),
          },
          {
            label: "Atoms",
            icon: ShareIcon,
            onClick: () => setRoute(1),
          },
          {
            label: "Discover",
            icon: SearchIcon,
            onClick: () => setRoute(2),
          },
          {
            label: "Network",
            icon: VirtualDatabaseIcon,
            onClick: () => setRoute(3),
          },
        ]}
      />
    </>
  )
}

;<MyComponent />
```
