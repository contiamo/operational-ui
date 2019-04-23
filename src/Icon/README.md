Operational's SVG icon set packaged as a single component.

### Usage

```jsx
import * as React from "react"
import { Icon, ICONS } from "@operational/components"
;<>
  <Icon name={ICONS.Add} size={36} />
  <Icon name={ICONS.Function} size={36} />
  <Icon name={ICONS.Funnel} size={36} color="#00bb00" />
  <Icon name={ICONS.Bundle} size={36} color="error" />
  <p>And here some brand icons:</p>
  <Icon name={ICONS.OperationalUI} size={36} />
  <Icon name={ICONS.Pantheon} size={36} colored />
  <Icon name={ICONS.Labs} size={36} />
</>
```

#### With margins for content

```jsx
import * as React from "react"
import { Icon, ICONS } from "@operational/components"
;<div style={{ display: "flex", alignItems: "center" }}>
  <Icon name={ICONS.Add} left /> Play that song!
</div>
```

```jsx
import * as React from "react"
import { Icon, ICONS } from "@operational/components"
;<div style={{ display: "flex", alignItems: "center" }}>
  I'm on the right! <Icon name={ICONS.Document} right />
</div>
```

#### All Icons

```jsx
import * as React from "react"
import { Icon, Table, ResourceName, Input, allIcons } from "@operational/components"

const MyComponent = () => {
  const [filter, setFilter] = React.useState("")
  const [filteredIcons, setFilteredIcons] = React.useState(allIcons)

  React.useEffect(() => {
    setFilteredIcons(allIcons.filter(iconName => iconName.toLowerCase().includes(filter.toLowerCase())))
  }, [filter])

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Input
          icon="Search"
          placeholder="Filter Icons..."
          type="text"
          value={filter}
          onChange={value => setFilter(value)}
          fullWidth
        />
      </div>
      <Table
        fixedLayout
        data={filteredIcons}
        columns={[
          {
            heading: "Name",
            cell: iconName => <ResourceName>{iconName}</ResourceName>,
          },
          {
            heading: "Icon",
            cell: iconName => <Icon name={iconName} />,
          },
        ]}
      />
    </>
  )
}

;<MyComponent />
```
