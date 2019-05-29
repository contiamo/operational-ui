## Tabs

Tabs component implemented according to [WAI-ARIA specification](https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html).

### Simple usage

```jsx
import * as React from "react"
import { Tabs } from "@operational/components"

const MyComponent = () => {
  const [tabs, setTabs] = React.useState([
    {
      title: "tab 1",
      content: () => (
        <div>
          <p>Lorem ipsum 1</p>
        </div>
      ),
      key: 0,
    },
    {
      title: "tab 2",
      content: () => (
        <div>
          <p>Lorem ipsum 2</p>
        </div>
      ),
      key: 1,
    },
    {
      title: "tab 3",
      content: () => (
        <div>
          <p>Lorem ipsum 3</p>
        </div>
      ),
      key: 2,
    },
    {
      title: "tab 4",
      content: () => (
        <div>
          <p>Lorem ipsum 4</p>
        </div>
      ),
      key: 3,
    },
  ])
  const [active, setActive] = React.useState(0)

  const onClose = index => {
    const newTabs = [...tabs]
    newTabs.splice(index, 1)
    if (index === active && index >= newTabs.length) {
      setActive(newTabs.length - 1)
    }
    setTabs(newTabs)
  }

  return <Tabs tabs={tabs} active={active} onActivate={setActive} onClose={onClose} />
}

;<MyComponent />
```
