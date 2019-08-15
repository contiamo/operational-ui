Operational's SVG icon set packaged as a single component.

### Usage

```jsx
import * as React from "react"
import { AddIcon, FunctionIcon, OlapIcon } from "@operational/components"
;<>
  <AddIcon size={36} />
  <FunctionIcon size={36} />
  <OlapIcon size={36} color="#00bb00" />
  <OlapIcon size={36} color="error" />
</>
```

#### As button

```jsx
import * as React from "react"
import { PlusIcon, PlayIcon, AddIcon } from "@operational/components"
;<>
  <AddIcon size={18} onClick={() => alert("click")} role="button" aria-label="Add" />
  <PlusIcon size={18} onClick={() => alert("click")} role="button" aria-label="Add" />
  <PlayIcon size={18} onClick={() => alert("click")} role="button" aria-label="Play" />
</>
```

#### With margins for content

```jsx
import * as React from "react"
import { AddIcon } from "@operational/components"
;<div style={{ display: "flex", alignItems: "center" }}>
  <AddIcon left /> Play that song!
</div>
```

```jsx
import * as React from "react"
import { DocumentIcon } from "@operational/components"
;<div style={{ display: "flex", alignItems: "center" }}>
  I'm on the right! <DocumentIcon right />
</div>
```

#### All Icons

```jsx
import * as React from "react"
import { Table, ResourceName, Input, SearchIcon, Code, useOperationalContext } from "@operational/components"
import * as Icon from "@operational/components/Icon"

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
          icon={SearchIcon}
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
          .filter(name => name.endsWith("Icon") && name.toLowerCase().includes(filter.toLowerCase()))
          .map(name => ({ name }))}
        columns={[
          {
            heading: "Name",
            cell: i => <ResourceName>{i.name.slice(0, -"Icon".length)}</ResourceName>,
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
