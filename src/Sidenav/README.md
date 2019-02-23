Sidenavs render a two-level hierarchical navigation element comprised of headers and items.

```jsx
import * as React from "react"
import { Sidenav, SidenavHeader, SidenavItem } from "@operational/components"

const StatefulSidenav = () => {
  const [activeHeaders, setActiveHeaders] = React.useState([1, 3])

  const toggle = React.useCallback(
    index =>
      setActiveHeaders(
        activeHeaders.indexOf(index) > -1
          ? activeHeaders.filter(headerIndex => headerIndex !== index)
          : [...activeHeaders, index],
      ),
    [activeHeaders],
  )

  return (
    <div style={{ height: 400 }}>
      <Sidenav>
        <SidenavHeader condensed icon="Home" label="Project Home" />
        <SidenavHeader label="The Prize" active={activeHeaders.indexOf(1) > -1} onToggle={() => toggle(1)}>
          <SidenavItem label="The First Prize" compactLabel="First" icon="Add" />
          <SidenavItem label="The Second Prize" compactLabel="Second" icon="Admin" />
          <SidenavItem label="No Short Label" icon="Bundle" />
        </SidenavHeader>
        <SidenavHeader label="Let It Snow" active={activeHeaders.indexOf(2) > -1} onToggle={() => toggle(2)}>
          <SidenavItem label="The Fourth Prize" compactLabel="Fourth" icon="Catalog" />
          <SidenavItem label="The Fifth Prize" compactLabel="Fifth" icon="ChevronDown" />
          {/* No Icon case */}
          <SidenavItem label="The Sixth Prize" compactLabel="Sixth" />
        </SidenavHeader>
        <SidenavHeader label="Let It Snow" active={activeHeaders.indexOf(3) > -1} onToggle={() => toggle(3)}>
          <SidenavItem label="The Seventh Prize" compactLabel="Seventh" icon="Document" />
          <SidenavItem label="The Eighth Prize" compactLabel="Eighth" icon="Endpoint" />
          <SidenavItem label="The Ninth Prize" compactLabel="Ninth" icon="Entity" />
        </SidenavHeader>
      </Sidenav>
    </div>
  )
}

;<StatefulSidenav />
```

### Compact Mode

```jsx
import * as React from "react"
import { Sidenav, SidenavHeader, SidenavItem } from "@operational/components"
;<Sidenav compact>
  <SidenavHeader condensed icon="Home" label="Project Home" />
  <SidenavHeader label="The Prize">
    <SidenavItem label="Overview" icon="Function" />
    <SidenavItem label="Use Cases" icon="Funnel" />
    <SidenavItem label="Guides" icon="Home" />
  </SidenavHeader>
  <SidenavHeader label="Let It Snow">
    <SidenavItem label="Steak" icon="Jobs" />
    <SidenavItem label="Frites" active icon="Lock" />
    <SidenavItem label="Rum" icon="No" />
  </SidenavHeader>
</Sidenav>
```

### With an item placed at the bottom

```jsx
import * as React from "react"
import { Sidenav, SidenavHeader, SidenavItem } from "@operational/components"
;<div style={{ height: 600 }}>
  <Sidenav compact>
    <SidenavHeader label="Let It Snow">
      <SidenavItem label="Steak" icon="Jobs" />
      <SidenavItem label="Frites" active icon="Lock" />
    </SidenavHeader>
    <SidenavItem end label="Rum" icon="No" />
  </Sidenav>
</div>
```
