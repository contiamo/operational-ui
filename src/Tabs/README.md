## Tabs

Tabs component implemented (mostly) according to [WAI-ARIA specification](https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html).

### Simple usage

```jsx
import * as React from "react"
import { Tabs } from "@operational/components"

const MyComponent = () => {
  const [active, setActive] = React.useState(0)
  return (
    <Tabs
      tabs={[
        {
          title: "tab 1",
          content: () => (
            <div>
              <p>Lorem ipsum</p>
            </div>
          ),
          key: 0,
        },
        {
          title: "tab 2",
          content: () => (
            <div>
              <p>Lorem ipsum</p>
            </div>
          ),
          key: 1,
        },
      ]}
      active={active}
      onActivate={setActive}
      onClose={() => undefined}
    />
  )
}

;<MyComponent />
```
