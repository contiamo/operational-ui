### Usage

```jsx
import * as React from "react"
import { Checkbox, Form } from "@operational/components"

const MyComponent = () => {
  const [value, setValue] = React.useState(true)
  return (
    <Form>
      <Checkbox label="I'm like cheese" onChange={setValue} value={value} />
      <Checkbox disabled label="I'm like chicken" onChange={setValue} value={value} />
      <Checkbox condensed label="mini me is mini" onChange={setValue} value={value} />
    </Form>
  )
}

;<MyComponent />
```
