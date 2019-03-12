### Common action on click

A single `onClick` action common to all items in the `ActionMenu` can be passed in, with an optional `item` argument.

```jsx
import * as React from "react"
import { ActionMenu } from "@operational/components"

;<ActionMenu items={["Open editor", "Stop", "Destroy"]} onClick={item => alert(`"${item}" clicked`)} />
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
;<ActionMenu items={items} />
```
