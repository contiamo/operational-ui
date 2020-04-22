Sidenavs render a two-level hierarchical navigation element comprised of headers and items.

```jsx
import * as React from "react"
import {
  Sidenav,
  SidenavHeader,
  SidenavItem,
  AddIcon,
  HomeIcon,
  AddTableIcon,
  AdminIcon,
  BinaryIcon,
  DataSourceIcon,
  DateIcon,
  ChevronDownIcon,
  DocumentIcon,
  DimensionIcon,
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
    <div style={{ height: 400, display: "flex" }}>
      <Sidenav>
        <SidenavHeader condensed icon={HomeIcon} label="Project Home" />
        <SidenavHeader label="Inactive SidenavHeader">
          <SidenavItem label="Cheese" />
          <SidenavItem label="Coffee" items={[{ label: "Tea" }]} />
          <SidenavItem label="Cake" />
        </SidenavHeader>
        <SidenavHeader label="Active SidenavHeader" active={activeHeaders.indexOf(1) > -1} onToggle={() => toggle(1)}>
          <SidenavItem label="Link, compactLabel" compactLabel="First" icon={AddIcon} to="https://example.com" />
          <SidenavItem label="Link, active" active icon={AddIcon} to="https://example.com" />
          <SidenavItem label="Link" icon={AddIcon} to="https://example.com" />
          <SidenavItem active label="Active, compactLabel" compactLabel="Second" icon={AdminIcon} />
          <SidenavItem label="No Short Label" icon={BinaryIcon} />
        </SidenavHeader>
        <SidenavHeader label="Let It Snow" active={activeHeaders.indexOf(2) > -1} onToggle={() => toggle(2)}>
          <SidenavItem label="The Fourth Prize" compactLabel="Fourth" icon={DataSourceIcon} />
          <SidenavItem label="The Fifth Prize" compactLabel="Fifth" icon={ChevronDownIcon} />
          {/* No Icon case */}
          <SidenavItem label="The Sixth Prize" compactLabel="Sixth" />
        </SidenavHeader>
        <SidenavHeader label="Let It Snow" active={activeHeaders.indexOf(3) > -1} onToggle={() => toggle(3)}>
          <SidenavItem label="The Seventh Prize" compactLabel="Seventh" icon={DocumentIcon} />
          <SidenavItem label="The Eighth Prize" compactLabel="Eighth" icon={DimensionIcon} />
          <SidenavItem label="The Ninth Prize" compactLabel="Ninth" icon={DateIcon} />
        </SidenavHeader>
      </Sidenav>

      {/* Spacer */}
      <div style={{ width: 20 }} />

      {/* Dark Mode */}
      <Sidenav dark>
        <SidenavHeader condensed icon={HomeIcon} label="Project Home" />
        <SidenavHeader label="The Prize" active={activeHeaders.indexOf(1) > -1} onToggle={() => toggle(1)}>
          <SidenavItem label="The First Prize" compactLabel="First" icon={AddIcon} />
          <SidenavItem active label="The Second Prize" compactLabel="Second" icon={AdminIcon} />
          <SidenavItem label="No Short Label" icon={BinaryIcon} />
        </SidenavHeader>
        <SidenavHeader label="Let It Snow" active={activeHeaders.indexOf(2) > -1} onToggle={() => toggle(2)}>
          <SidenavItem label="The Fourth Prize" compactLabel="Fourth" icon={DataSourceIcon} />
          <SidenavItem label="The Fifth Prize" compactLabel="Fifth" icon={ChevronDownIcon} />
          {/* No Icon case */}
          <SidenavItem label="The Sixth Prize" compactLabel="Sixth" />
        </SidenavHeader>
        <SidenavHeader label="Let It Snow" active={activeHeaders.indexOf(3) > -1} onToggle={() => toggle(3)}>
          <SidenavItem label="The Seventh Prize" compactLabel="Seventh" icon={DocumentIcon} />
          <SidenavItem label="The Eighth Prize" compactLabel="Eighth" icon={DimensionIcon} />
          <SidenavItem label="The Ninth Prize" compactLabel="Ninth" icon={DateIcon} />
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
  SidenavSeparator,
  SidenavItem,
  HomeIcon,
  FunctionIcon,
  DocumentIcon,
  LockIcon,
  NoIcon,
  YesIcon,
} from "@operational/components"
;<div style={{ display: "flex" }}>
  <Sidenav compact>
    <SidenavHeader condensed icon={HomeIcon} label="Project Home" />
    <SidenavHeader label="The Prize">
      <SidenavItem label="Overview" icon={FunctionIcon} />
      <SidenavItem label="Use Cases" icon={DocumentIcon} />
      <SidenavSeparator />
      <SidenavItem label="Guides" icon={HomeIcon} />
    </SidenavHeader>
    <SidenavHeader label="Let It Snow">
      <SidenavItem label="Steak" icon={YesIcon} />
      <SidenavSeparator />
      <SidenavItem label="Frites" active icon={LockIcon} />
      <SidenavItem label="Rum" icon={NoIcon} />
    </SidenavHeader>
  </Sidenav>

  {/* Spacer */}
  <div style={{ width: 20 }} />

  {/* Dark mode */}
  <Sidenav compact dark>
    <SidenavHeader condensed icon={HomeIcon} label="Project Home" />
    <SidenavHeader label="The Prize">
      <SidenavItem label="Overview" icon={FunctionIcon} />
      <SidenavItem label="Use Cases" icon={DocumentIcon} />
      <SidenavSeparator />
      <SidenavItem label="Guides" icon={HomeIcon} />
    </SidenavHeader>
    <SidenavHeader label="Let It Snow">
      <SidenavItem label="Steak" icon={YesIcon} />
      <SidenavSeparator />
      <SidenavItem label="Frites" active icon={LockIcon} />
      <SidenavItem label="Rum" icon={NoIcon} />
    </SidenavHeader>
  </Sidenav>
</div>
```

### With an item placed at the bottom

```jsx
import * as React from "react"
import { Sidenav, SidenavHeader, SidenavItem, LogsIcon, LockIcon, NoIcon } from "@operational/components"
;<div style={{ height: 600, display: "flex" }}>
  <Sidenav compact>
    <SidenavHeader label="Let It Snow">
      <SidenavItem label="Steak" icon={LogsIcon} />
      <SidenavItem label="Frites" active icon={LockIcon} />
    </SidenavHeader>
    <SidenavItem end label="Rum" icon={NoIcon} />
  </Sidenav>

  {/* Spacer */}
  <div style={{ width: 20 }} />

  {/* Dark Mode */}
  <Sidenav compact dark>
    <SidenavHeader label="Let It Snow">
      <SidenavItem label="Steak" icon={LogsIcon} />
      <SidenavItem label="Frites" active icon={LockIcon} />
    </SidenavHeader>
    <SidenavItem end label="Rum" icon={NoIcon} />
  </Sidenav>
</div>
```
