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

### A drag-and-drop example

The following example shows how card sections can support a full-fledged drag-and-drop example. This example is quite verbose to implement the HTML5 drag-and-drop API, but beyond the logic, the different settings to toggle drag-and-drop feedback states are all represented.

```jsx
import * as React from "react"
import { Card, CardSection, Tree } from "@operational/components"

const Example = () => {
  /** Items in the drag source container */
  const [itemsInSource, setItemsInSource] = React.useState(["Item 1", "Item 2", "Item 3"])
  /** Items in the drop target container */
  const [itemsInTarget, setItemsInTarget] = React.useState([])
  /** The item being dragged out of the above two arrays, if any */
  const [dragSource, setDragSource] = React.useState(undefined)
  /** The identifier of the current drop target, if any */
  const [dropTarget, setDropTarget] = React.useState(undefined)

  return (
    <div style={{ width: 600, height: 300, margin: 20 }}>
      <Card>
        <CardSection>
          <Tree
            trees={itemsInSource.map(item => ({
              label: item,
              draggable: true,
              onDragStart: ev => {
                setDragSource(item)
              },
              onDragEnd: ev => {
                setDragSource(undefined)
              },
              tag: "C",
              childNodes: [],
            }))}
          />
        </CardSection>
      </Card>
      <Card
        stackSections="horizontal"
        sections={
          <>
            {/* Drop target identified by "container1" */}
            <CardSection
              title="Container 1"
              onDragOver={ev => {
                // Preventing default here so the `onDrop` event is fired.
                ev.preventDefault()
                /**
                 * This check is necessary to prevent blocking the render loop by piling up unnecessary `setState` calls
                 * when this element is already a drop target.
                 */
                if (dropTarget === "container1") {
                  return
                }
                setDropTarget("container1")
              }}
              dragAndDropFeedback={dragSource && (dropTarget === "container1" ? "dropping" : "validTarget")}
              onDragLeave={() => {
                setDropTarget(undefined)
              }}
              onDrop={() => {
                setItemsInTarget([...itemsInTarget, dragSource])
                setItemsInSource(itemsInSource.filter(item => item !== dragSource))

                setDropTarget(undefined)
                setDragSource(undefined)
              }}
            >
              <Tree
                trees={itemsInTarget.map(item => ({
                  label: item,
                  tag: "C",
                  childNodes: [],
                  onRemove: () => {
                    setItemsInSource([...itemsInSource, item])
                    setItemsInTarget(itemsInTarget.filter(targetItem => targetItem !== item))
                  },
                }))}
              />
            </CardSection>
            {/* Drop target identified by "container2" */}
            <CardSection
              title="Container 2"
              onDragOver={() => {
                // Preventing default here so the `onDrop` event is fired.
                ev.preventDefault()
                /**
                 * This check is necessary to prevent blocking the render loop by piling up unnecessary `setState` calls
                 * when this element is already a drop target.
                 */
                if (dropTarget === "container2") {
                  return
                }
                setDropTarget("container2")
              }}
              dragAndDropFeedback={dragSource ? "invalidTarget" : undefined}
              onDragLeave={() => {
                setDropTarget(undefined)
              }}
            />
          </>
        }
      />
    </div>
  )
}

;<Example />
```
