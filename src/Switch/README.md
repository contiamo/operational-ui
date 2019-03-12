### Usage

```jsx
import * as React from "react"
import { Switch } from "@operational/components"

const MyComponent = () => {
  const [isOn, setIsOn] = React.useState(true)

  return <Switch on={isOn} left="off" right="on" onChange={() => setIsOn(!isOn)} />
}

;<MyComponent />
```
