### Usage

```jsx
import * as React from "react"
import { Form, Input } from "@operational/components"

const MyComponent = () => {
  const [value, setValue] = React.useState("")
  return (
    <Form>
      <Input value={value} onChange={setValue} />
      <Input placeholder="Name here" value={value} onChange={setValue} />
      <Input placeholder="flying-monkeys" label="Username" value={value} onChange={setValue} />
      <Input
        type="password"
        placeholder="Security to the max! 🔒"
        label="Password"
        name="password"
        value={value}
        onChange={setValue}
      />
      <div>
        <Input
          value={value}
          label="Phone number"
          hint="Your phone number is a wonderful construct that people can call you on. Phones are great. We love phones."
          onChange={setValue}
        />
      </div>
    </Form>
  )
}

;<MyComponent />
```

### Clearable Value

```jsx
import * as React from "react"
import { Input } from "@operational/components"

const MyOtherComponent = () => {
  const [value, setValue] = React.useState("Clear me...")
  return <Input value={value} onChange={setValue} clear={() => setValue("")} />
}

;<MyOtherComponent />
```

### With Locked State

```jsx
import * as React from "react"
import { Input } from "@operational/components"

const MyThirdComponent = () => {
  const [isInputLocked, setIsInputLocked] = React.useState(true)
  return (
    <Input
      value="My Storage Unit"
      label="Database Name"
      onToggle={() => setIsInputLocked(!isInputLocked)}
      disabled={isInputLocked}
      hint={isInputLocked ? "Click the lock to change this" : "This value can now be changed"}
    />
  )
}

;<MyThirdComponent />
```

### With an Error

```jsx
import * as React from "react"
import { Input, Form } from "@operational/components"
;<Form>
  <div>
    <Input id="help-usa" label="Orange Man" value="Build the wall!" error="Nope, unity." />
    <Input id="error-without-label" value="Hate hate hate" error="Too negative. Love." />
  </div>
</Form>
```

### With an Action Button

```jsx
import * as React from "react"
import { Input } from "@operational/components"
;<Input
  value="JNAPE92"
  label="Employee ID"
  icon="User"
  onIconClick={() => {
    alert("You have clicked on JNAPE92!")
  }}
/>
```

### Copyable Input

You can have a field with a "copy to clipboard" button with the `copy` prop.

```jsx
import * as React from "react"
import { Input } from "@operational/components"
;<Input value="j08wejf08wejg01j3401jg" label="Your API Token" copy />
```

### Full Width

```jsx
import * as React from "react"
import { Input } from "@operational/components"
;<Input fullWidth value="Dave the Sheep" label="Hi, My Name is" />
```
