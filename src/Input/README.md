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
          label="Phone number"
          hint="Your phone number is a wonderful construct that people can call you on. Phones are great. We love phones."
          value={value}
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

### Pre-set Value

```jsx
import * as React from "react"
import { Input } from "@operational/components"
;<Input value="I came from an Autocomplete or something..." preset />
```

### In a small container

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

### With toggle state

```jsx
import * as React from "react"
import { Form, Input } from "@operational/components"
;<Form>
  <div>
    <Input id="help-usa" label="Orange Man" value="Build the wall!" error="Nope, unity." />
    <Input id="error-without-label" value="Hate hate hate" error="Too negative. Love." />
  </div>
</Form>
```

### With Error

```jsx
import * as React from "react"
import { Input } from "@operational/components"
;<Input
  value="JNAPE92"
  label="Employee ID"
  icon="User"
  onIconClick={() => {
    console.log("clicked icon")
  }}
/>
```

### With `copy` option

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
