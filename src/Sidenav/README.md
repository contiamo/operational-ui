Sidenavs render a two-level hierarchical navigation element comprised of headers and items.

```jsx
import * as React from "react"
import {
  Sidenav,
  SidenavHeader,
  SidenavItem,
  IconAdd,
  IconHome,
  IconAddTable,
  IconAdmin,
  IconBinary,
  IconDataSource,
  IconDate,
  IconChevronDown,
  IconDocument,
  IconDimension,
} from "@operational/components"

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
        <SidenavHeader condensed icon={IconHome} label="Project Home" />
        <SidenavHeader label="The Prize" active={activeHeaders.indexOf(1) > -1} onToggle={() => toggle(1)}>
          <SidenavItem label="The First Prize" compactLabel="First" icon={IconAdd} />
          <SidenavItem label="The Second Prize" compactLabel="Second" icon={IconAdmin} />
          <SidenavItem label="No Short Label" icon={IconBinary} />
        </SidenavHeader>
        <SidenavHeader label="Let It Snow" active={activeHeaders.indexOf(2) > -1} onToggle={() => toggle(2)}>
          <SidenavItem label="The Fourth Prize" compactLabel="Fourth" icon={IconDataSource} />
          <SidenavItem label="The Fifth Prize" compactLabel="Fifth" icon={IconChevronDown} />
          {/* No Icon case */}
          <SidenavItem label="The Sixth Prize" compactLabel="Sixth" />
        </SidenavHeader>
        <SidenavHeader label="Let It Snow" active={activeHeaders.indexOf(3) > -1} onToggle={() => toggle(3)}>
          <SidenavItem label="The Seventh Prize" compactLabel="Seventh" icon={IconDocument} />
          <SidenavItem label="The Eighth Prize" compactLabel="Eighth" icon={IconDimension} />
          <SidenavItem label="The Ninth Prize" compactLabel="Ninth" icon={IconDate} />
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
import {
  Sidenav,
  SidenavHeader,
  SidenavItem,
  IconHome,
  IconFunction,
  IconDocument,
  IconPadlock,
  IconNo,
  IconYes,
} from "@operational/components"
;<Sidenav compact>
  <SidenavHeader condensed icon={IconHome} label="Project Home" />
  <SidenavHeader label="The Prize">
    <SidenavItem label="Overview" icon={IconFunction} />
    <SidenavItem label="Use Cases" icon={IconDocument} />
    <SidenavItem label="Guides" icon={IconHome} />
  </SidenavHeader>
  <SidenavHeader label="Let It Snow">
    <SidenavItem label="Steak" icon={IconYes} />
    <SidenavItem label="Frites" active icon={IconPadlock} />
    <SidenavItem label="Rum" icon={IconNo} />
  </SidenavHeader>
</Sidenav>
```

### With an item placed at the bottom

```jsx
import * as React from "react"
import { Sidenav, SidenavHeader, SidenavItem, IconLogs, IconPadlock, IconNo } from "@operational/components"
;<div style={{ height: 600 }}>
  <Sidenav compact>
    <SidenavHeader label="Let It Snow">
      <SidenavItem label="Steak" icon={IconLogs} />
      <SidenavItem label="Frites" active icon={IconPadlock} />
    </SidenavHeader>
    <SidenavItem end label="Rum" icon={IconNo} />
  </Sidenav>
</div>
```
