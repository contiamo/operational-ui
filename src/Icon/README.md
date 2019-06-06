Operational's SVG icon set packaged as a single component.

### Usage

```jsx
import * as React from "react"
import { IconAdd, IconFunction, IconOlap } from "@operational/components"
;<>
  <IconAdd size={36} />
  <IconFunction size={36} />
  <IconOlap size={36} color="#00bb00" />
  <IconOlap size={36} color="error" />
</>
```

#### With margins for content

```jsx
import * as React from "react"
import { IconAdd } from "@operational/components"
;<div style={{ display: "flex", alignItems: "center" }}>
  <IconAdd left /> Play that song!
</div>
```

```jsx
import * as React from "react"
import { IconDocument } from "@operational/components"
;<div style={{ display: "flex", alignItems: "center" }}>
  I'm on the right! <IconDocument right />
</div>
```

#### All Icons

```jsx
import * as React from "react"
import { Table, ResourceName, Input, IconSearch, Code, useOperationalContext } from "@operational/components"
import * as Icon from "@operational/components/Icon/Icon"

const MyComponent = () => {
  const [filter, setFilter] = React.useState("")
  const [color, setColor] = React.useState("")
  const [size, setSize] = React.useState(18)
  const { pushMessage } = useOperationalContext()

  return (
    <>
      <div
        style={{
          marginBottom: 16,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridGap: 8,
        }}
      >
        <Input
          icon={IconSearch}
          label="Search"
          placeholder="Filter Icons..."
          type="text"
          value={filter}
          onChange={value => setFilter(value)}
        />
        <Input placeholder="Color" type="text" label="Color" value={color} onChange={value => setColor(value)} />
        <Input
          placeholder="Size"
          type="number"
          label="Size"
          value={size.toString()}
          onChange={value => setSize(+value)}
        />
      </div>
      <Table
        data={Object.keys(Icon)
          .filter(name => !name.startsWith("_") && name.toLowerCase().includes(filter.toLowerCase()))
          .map(name => ({ name }))}
        columns={[
          {
            heading: "Name",
            cell: i => <ResourceName>{i.name.slice("Icon".length)}</ResourceName>,
            width: 200,
          },
          {
            heading: "Component Name",
            cell: i => (
              <Code
                syntax="typescript"
                copyable
                onCopy={() => pushMessage({ type: "info", body: "Successfully Copied!" })}
              >
                {`<${i.name}${color ? ` color="${color}"` : ""} size={${size}}/>`}
              </Code>
            ),
            width: 400,
          },
          {
            heading: "Icon",
            cell: i => React.createElement(Icon[i.name], { color, size, right: true }),
          },
        ]}
      />
    </>
  )
}

;<MyComponent />
```
