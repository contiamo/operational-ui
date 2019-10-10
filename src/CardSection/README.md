Card sections are flexibly stacked sub-containers designed to fit within cards. If specified, cards ignore other content-setting properties (`data`, `children`).

### Simple usage

```jsx
import * as React from "react"
import { Card, CardSection } from "@operational/components"

const MyComponent = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(true)

  return (
    <div style={{ width: 300 }}>
      <Card
        sections={
          <>
            <CardSection title="Section 1" collapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)}>
              Content 1
            </CardSection>
            <CardSection title="Section 2">Content2</CardSection>
          </>
        }
      />
    </div>
  )
}

;<MyComponent />
```

### Horizontal stacking

```jsx
import * as React from "react"
import { Card, CardSection } from "@operational/components"
;<div style={{ width: 300 }}>
  <Card
    stackSections="horizontal"
    sections={
      <>
        <CardSection title="Section 1">Content 1</CardSection>
        <CardSection title="Section 2">Content 2</CardSection>
      </>
    }
  />
</div>
```

### Synchronized stacking

```jsx
import * as React from "react"
import { Card, CardSection } from "@operational/components"

const MyOtherComponent = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div style={{ width: 300 }}>
      <Card
        stackSections="horizontal"
        sections={
          <>
            <CardSection
              title="Section 1"
              collapsed={isCollapsed}
              forceToggleHoverStyles={isHovered}
              onToggleMouseEnter={() => setIsHovered(true)}
              onToggleMouseLeave={() => setIsHovered(false)}
              onToggle={() => setIsCollapsed(!isCollapsed)}
            >
              Content 1
            </CardSection>
            <CardSection
              title="Section 2"
              collapsed={isCollapsed}
              forceToggleHoverStyles={isHovered}
              onToggleMouseEnter={() => setIsHovered(true)}
              onToggleMouseLeave={() => setIsHovered(false)}
              onToggle={() => setIsCollapsed(!isCollapsed)}
            >
              Content 2
            </CardSection>
          </>
        }
      />
    </div>
  )
}

;<MyOtherComponent />
```

### Actions and NO title

```jsx
import * as React from "react"
import { Card, CardSection } from "@operational/components"
;<div style={{ width: 300 }}>
  <Card
    stackSections="horizontal"
    sections={
      <>
        <CardSection actions={["Action 1", "Action 2"]}>Content 1</CardSection>
      </>
    }
  />
</div>
```

### Actions

```jsx
import * as React from "react"
import { Card, CardSection } from "@operational/components"
;<div style={{ width: 300 }}>
  <Card
    stackSections="horizontal"
    sections={
      <>
        <CardSection title="Section 1" actions={["Action 1", "Action 2"]}>
          Content 1
        </CardSection>
      </>
    }
  />
</div>
```

### States

Card sections can assume a number of states indicating disabledness and drag-and-drop permissions.

```jsx
import * as React from "react"
import { Card, CardSection } from "@operational/components"
;<div style={{ width: 300 }}>
  <Card
    stackSections="horizontal"
    sections={
      <>
        <CardSection title="Section 1" disabled>
          Content 1
        </CardSection>
        <CardSection title="Section 2">Content 2</CardSection>
      </>
    }
  />
</div>
```
