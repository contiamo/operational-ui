## Tabs

Tabs component implemented according to [WAI-ARIA specification](https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html).

### Simple usage

```jsx
import * as React from "react"
import { Tabs, OlapIcon, Textarea } from "@operational/components"

const MyComponent = () => {
  const [tabs, setTabs] = React.useState([
    {
      title: "tab 1 tab 1 tab 1 tab 1 tab 1 tab 1 tab 1 tab 1",
      color: "#e2eff5",
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
    {
      title: "tab 5",
      status: "loading",
    },
    {
      title: "tab 6",
      status: "error",
    },
    {
      title: "tab 7",
      status: "success",
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
    <div style={{ height: "220px" }}>
      <Tabs tabSize="fixed" tabs={tabs} active={active} onActivate={setActive} onClose={onClose} onInsert={onInsert}>
        <div style={{ padding: 8 }}>
          <Textarea fullWidth height={143} value={`Tab ${active + 1}`} />
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
        scroll={false}
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
