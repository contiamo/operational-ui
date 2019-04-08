# Usage

```js
import React from "react"
import { Flow } from "@operational/components"
;<Flow
  items={[
    {
      label: "Yes",
      icon: "Yes",
      iconColor: "primary",
    },
    {
      label: "People",
      icon: "Users",
      iconColor: "primary",
    },
    {
      label: "History",
      icon: "Undo",
      iconColor: "primary",
    },
    {
      label: "Troy",
      icon: "User",
      iconColor: "primary",
    },
  ]}
/>
```

# Condensed mode

To condense your items, simply add a condensed prop!

```js
import React from "react"
import { Flow } from "@operational/components"
;<Flow
  condensed
  items={[
    {
      icon: "Unlock",
    },
    {
      icon: "Sync",
      iconColor: "#fa0",
    },
    {
      icon: "Sql",
      iconColor: "#0af",
    },
    {
      icon: "SortDescending",
      iconColor: "#f0f",
    },
  ]}
/>
```

# Controlled

`Flow` components can be controlled, and do things on click &mdash; like navigating to a new page or similar like so.

```js
import React from "react"
import { Flow, Title } from "@operational/components"

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
            icon: "SortAscending",
            onClick: () => setRoute(0),
          },
          {
            icon: "Share",
            onClick: () => setRoute(1),
          },
          {
            icon: "Search",
            onClick: () => setRoute(2),
          },
          {
            icon: "Schema",
            onClick: () => setRoute(3),
          },
        ]}
      />
      <Flow
        activeItemIndex={route || 0}
        items={[
          {
            label: "Loss",
            icon: "SortDescending",
            onClick: () => setRoute(0),
          },
          {
            label: "Atoms",
            icon: "Share",
            onClick: () => setRoute(1),
          },
          {
            label: "Discover",
            icon: "Search",
            onClick: () => setRoute(2),
          },
          {
            label: "Network",
            icon: "Schema",
            onClick: () => setRoute(3),
          },
        ]}
      />
    </>
  )
}

;<MyComponent />
```
