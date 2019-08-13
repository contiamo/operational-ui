### Usage

```jsx
import * as React from "react"
import { DropdownButton } from "@operational/components"

const menuItems = ["Project", "User"]
;<DropdownButton
  color="error"
  items={menuItems}
  onClick={() => {
    console.log("Button clicked")
  }}
  onItemClick={() => {
    console.log("Item clicked")
  }}
>
  Create
</DropdownButton>
```

### Usage with complex list contents

In some cases, you might want your `label` to be a little bit more clever than just a string. This example shows a `ContextMenu` with a JSX element as its `label`.

```jsx
import * as React from "react"
import { DropdownButton, DatabaseIcon } from "@operational/components"

/* Anything can be a label */
const MyLabelContainer = ({ title, children }) => (
  <div style={{ display: "flex", alignItems: "center", width: "300px", whiteSpace: "normal" }}>
    <DatabaseIcon left />
    <div style={{ lineHeight: 1, width: "100%", margin: "8px 0", textAlign: "left" }}>
      <p style={{ fontWeight: "bold", margin: "0 0 4px 0" }}>{title}</p>
      {children}
    </div>
  </div>
)

const menuItems = [
  {
    label: (
      <MyLabelContainer title={"External"}>
        <span style={{ fontWeight: 400 }}>
          Connect to your existing external data sources - databases, big data storages and NoSQL DBs.
        </span>
      </MyLabelContainer>
    ),
    onClick: () => alert("External"),
  },
  {
    label: (
      <MyLabelContainer title={"Managed"}>
        <span style={{ fontWeight: 400 }}>
          Connect to your existing external data sources - databases, big data storages and NoSQL DBs.
        </span>
      </MyLabelContainer>
    ),
    onClick: () => alert("Managed"),
  },
  {
    label: (
      <MyLabelContainer title={"Virtual"}>
        <span style={{ fontWeight: 400 }}>
          Connect to your existing external data sources - databases, big data storages and NoSQL DBs.
        </span>
      </MyLabelContainer>
    ),
    onClick: () => alert("Virtual"),
  },
]

;<div style={{ display: "flex", justifyContent: "space-around" }}>
  <DropdownButton
    items={menuItems}
    onClick={() => {
      console.log("Button clicked")
    }}
  >
    Add data source
  </DropdownButton>
  <DropdownButton
    align="right"
    items={menuItems}
    onClick={() => {
      console.log("Button clicked")
    }}
  >
    Add data source
  </DropdownButton>
</div>
```

```jsx
import * as React from "react"
import { DropdownButton } from "@operational/components"

const menuItems = ["View", "Materialized view"]
;<div style={{ paddingLeft: 100 }}>
  <DropdownButton
    color="default"
    align="right"
    items={menuItems}
    onClick={() => {
      console.log("Button clicked")
    }}
    onItemClick={() => {
      console.log("Item clicked")
    }}
  >
    Save as...
  </DropdownButton>
</div>
```
