# Usage

```js
import * as React from "react"
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
import * as React from "react"
import { Flow, SyncIcon, UnlockIcon, PhysicalTableIcon, SortDescendingIcon } from "@operational/components"
;<Flow
  condensed
  items={[
    {
      label: "Unlock",
      icon: UnlockIcon,
    },
    {
      label: "Sync",
      icon: SyncIcon,
      iconColor: "primary",
    },
    {
      label: "Physical Table",
      icon: PhysicalTableIcon,
      iconColor: "primary",
    },
    {
      label: "Sort Descending",
      icon: SortDescendingIcon,
      iconColor: "primary",
    },
  ]}
/>
```

# Controlled

`Flow` components can be controlled, and do things on click &mdash; like navigating to a new page or similar like so.

```js
import * as React from "react"
import {
  Flow,
  Title,
  SortAscendingIcon,
  ShareIcon,
  SearchIcon,
  VirtualDBIcon,
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
            label: "Sort Ascending",
            icon: SortAscendingIcon,
            onClick: () => setRoute(0),
          },
          {
            label: "Share",
            icon: ShareIcon,
            onClick: () => setRoute(1),
          },
          {
            label: "Search",
            icon: SearchIcon,
            onClick: () => setRoute(2),
          },
          {
            label: "Virtual Database",
            icon: VirtualDBIcon,
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
            icon: VirtualDBIcon,
            onClick: () => setRoute(3),
          },
        ]}
      />
    </>
  )
}

;<MyComponent />
```
