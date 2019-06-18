## Tabs

Tabs component implemented according to [WAI-ARIA specification](https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html).

### Simple usage

```jsx
import * as React from "react"
import { Tabs, OlapIcon } from "@operational/components"

const MyComponent = () => {
  const [tabs, setTabs] = React.useState([
    {
      title: "tab 1 tab 1 tab 1 tab 1 tab 1 tab 1 tab 1 tab 1",
    },
    {
      title: "tab 2",
      icon: <OlapIcon size={12} />,
    },
    {
      title: "tab 3",
    },
    {
      title: "tab 4",
    },
  ])
  const [active, setActive] = React.useState(0)

  const onClose = React.useCallback(
    index => {
      const newTabs = [...tabs]
      newTabs.splice(index, 1)
      if (index === active && index >= newTabs.length) {
        setActive(newTabs.length - 1)
      }
      setTabs(newTabs)
    },
    [tabs, setActive, setTabs],
  )

  const onInsert = React.useCallback(
    index => {
      const newTabs = [
        ...tabs,
        {
          title: `tab ${tabs.length + 1}`,
          content: () => (
            <div>
              <p>Lorem ipsum {tabs.length + 1}</p>
            </div>
          ),
        },
      ]
      setTabs(newTabs)
      setActive(newTabs.length - 1)
    },
    [tabs, setActive, setTabs],
  )

  return (
    <div style={{ height: "200px" }}>
      <Tabs
        tabs={tabs}
        active={active}
        onActivate={setActive}
        onClose={onClose}
        onInsert={onInsert}
        style={{ height: "100%", width: "100%" }}
      >
        <div style={{ padding: 20 }}>
          <p>Lorem ipsum {active + 1}</p>
          <p>Lorem ipsum {active + 1}</p>
          <p>Lorem ipsum {active + 1}</p>
          <p>Lorem ipsum {active + 1}</p>
          <p>Lorem ipsum {active + 1}</p>
          <p>Lorem ipsum {active + 1}</p>
          <p>Lorem ipsum {active + 1}</p>
        </div>
      </Tabs>
    </div>
  )
}

;<MyComponent />
```

### Usage in a Sidebar

```jsx
import * as React from "react"
import { styled, Tabs, OlapIcon } from "@operational/components"

const Sidebar = styled.div`
  width: 240px;
  height: 400px;
`

const MyComponent = () => {
  const [activeTab, setActiveTab] = React.useState(0)

  return (
    <Sidebar>
      <Tabs
        noScroll
        tabs={[{ title: "OLAP", icon: <OlapIcon /> }, { title: "Inventory" }]}
        active={activeTab}
        onActivate={setActiveTab}
      >
        <>Tab {activeTab}</>
      </Tabs>
    </Sidebar>
  )
}

;<MyComponent />
```
