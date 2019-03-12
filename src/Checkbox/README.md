### Usage

```jsx
import * as React from "react"
import { Checkbox } from "@operational/components"

const MyComponent = () => {
  const [value, setValue] = React.useState(true)
  return <Checkbox label="I'm awesome" onChange={setValue} value={value} />
}

;<MyComponent />
```

### Disabled version

```jsx
import * as React from "react"
import { Checkbox } from "@operational/components"

const MyOtherComponent = () => {
  const [value, setValue] = React.useState(true)
  return <Checkbox disabled label="I'm awesome" onChange={setValue} value={value} />
}

;<MyOtherComponent />
```
