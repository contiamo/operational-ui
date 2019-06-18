### Usage

```jsx
import * as React from "react"
import { CaretRightIcon, ContextMenu, ComboButton } from "@operational/components"
const menuItems = ["Project", "User"]
;<ComboButton title="Create" items={menuItems} />
```

### Usage with complex list contents

In some cases, you might want your `label` to be a little bit more clever than just a string. This example shows a `ContextMenu` with a JSX element as its `label`.

```jsx
import * as React from "react"
import { ComboButton, DataSourceIcon } from "@operational/components"

/* Anything can be a label */
const MyLabelContainer = ({ title, children, style }) => (
  <div style={{ display: "flex", alignItems: "center", width: "300px", whiteSpace: "normal" }}>
    <DataSourceIcon left />
    <div style={{ lineHeight: 1, width: "100%", margin: "8px 0" }}>
      <p style={{ fontWeight: "bold", margin: "0 0 4px 0" }}>{title}</p>
      {children}
    </div>
  </div>
)

const menuItems = [
  {
    label: (
      <MyLabelContainer title={"External"}>
        <span>Connect to your existing external data sources - databases, big data storages and NoSQL DBs.</span>
      </MyLabelContainer>
    ),
  },
  {
    label: (
      <MyLabelContainer title={"Managed"}>
        <span>Connect to your existing external data sources - databases, big data storages and NoSQL DBs.</span>
      </MyLabelContainer>
    ),
  },
  {
    label: (
      <MyLabelContainer title={"Virtual"}>
        <span>Connect to your existing external data sources - databases, big data storages and NoSQL DBs.</span>
      </MyLabelContainer>
    ),
  },
]
;<>
  <ComboButton title="Add data source" items={menuItems} />
</>
```
