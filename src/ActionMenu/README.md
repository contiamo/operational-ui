### Common action on click

A single `onClick` action common to all items in the `ActionMenu` can be passed in, with an optional `item` argument.

```jsx
import * as React from "react"
import { ActionMenu } from "@operational/components"

// For now, we assume that the actionMenu is always used on the right side of the screen
;<div style={{ display: "flex", justifyContent: "flex-end" }}>
  <ActionMenu items={["Open editor", "Stop", "Destroy"]} onClick={item => alert(`${item.label} clicked`)} />
</div>
```

### Different actions on click

Alternatively, each item can be assigned its own, individual `onClick` method (or none at all). No hover behaviour is enabled for items without an `onClick` method.

```jsx
import * as React from "react"
import { ActionMenu } from "@operational/components"

const items = [
  { label: "Open editor", onClick: () => alert("Open editor") },
  { label: "Stop", onClick: () => {} },
  { label: "Destroy" },
]

// For now, we assume that the actionMenu is always used on the right side of the screen
;<div style={{ display: "flex", justifyContent: "flex-end" }}>
  <ActionMenu items={items} />
</div>
```
