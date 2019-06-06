# Usage

```js
import React from "react"
import { Flow, IconYes, IconUser, IconUndo } from "@operational/components"
;<Flow
  items={[
    {
      label: "Yes",
      icon: IconYes,
      iconColor: "primary",
    },
    {
      label: "People",
      icon: IconUser,
      iconColor: "primary",
    },
    {
      label: "History",
      icon: IconUndo,
      iconColor: "primary",
    },
    {
      label: "Troy",
      icon: IconUser,
      iconColor: "primary",
    },
  ]}
/>
```

# Condensed mode

To condense your items, simply add a condensed prop!

```js
import React from "react"
import { Flow, IconSync, IconUnlock, IconPhysicalTable, IconSortDescending } from "@operational/components"
;<Flow
  condensed
  items={[
    {
      icon: IconUnlock,
    },
    {
      icon: IconSync,
      iconColor: "#fa0",
    },
    {
      icon: IconPhysicalTable,
      iconColor: "#0af",
    },
    {
      icon: IconSortDescending,
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
  IconSortAscending,
  IconShare,
  IconSearch,
  IconVirtualDatabase,
  IconSortDescending,
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
            icon: IconSortAscending,
            onClick: () => setRoute(0),
          },
          {
            icon: IconShare,
            onClick: () => setRoute(1),
          },
          {
            icon: IconSearch,
            onClick: () => setRoute(2),
          },
          {
            icon: IconVirtualDatabase,
            onClick: () => setRoute(3),
          },
        ]}
      />
      <Flow
        activeItemIndex={route || 0}
        items={[
          {
            label: "Loss",
            icon: IconSortDescending,
            onClick: () => setRoute(0),
          },
          {
            label: "Atoms",
            icon: IconShare,
            onClick: () => setRoute(1),
          },
          {
            label: "Discover",
            icon: IconSearch,
            onClick: () => setRoute(2),
          },
          {
            label: "Network",
            icon: IconVirtualDatabase,
            onClick: () => setRoute(3),
          },
        ]}
      />
    </>
  )
}

;<MyComponent />
```
