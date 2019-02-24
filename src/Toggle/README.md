## Usage

```jsx
import * as React from "react"
import { Toggle } from "@operational/components"

const MyComponent = () => {
  const [toggle, setToggle] = React.useState("visual")
  return (
    <div style={{ display: "flex" }}>
      <Toggle
        value={toggle}
        onChange={setToggle}
        options={[{ label: "Visual", value: "visual" }, { label: "Code", value: "code" }]}
      />
      <Toggle
        condensed
        value={toggle}
        onChange={setToggle}
        options={[{ label: "Visual", value: "visual" }, { label: "Code", value: "code" }]}
      />
    </div>
  )
}

;<MyComponent />
```
