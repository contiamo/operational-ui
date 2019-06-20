### Usage

```jsx
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

### With a custom Error component

We allow swapping out our default error components (shown above) with custom components that receive the error message via props. We use this in the [`DataTableInput`](/#!/DataTableInput) component and its example.

```jsx
import * as React from "react"
import { Input, Form, styled } from "@operational/components"

const getRandomBetween = (x, y) => Math.floor(Math.random() * y) + x

const makeErrorStyles = ({ left, top, size }) => ({
  position: "absolute",
  top: `${top}px`,
  left: `${left}px`,
  width: `${size}px`,
  height: `${size}px`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  fontWeight: 600,
  borderRadius: "50%",
  background: "red",
  color: "white",
})

;<Form>
  <div style={{ position: "relative" }}>
    <Input
      errorComponent={({ errorMessage }) => (
        <div
          style={makeErrorStyles({
            left: getRandomBetween(0, 500),
            size: getRandomBetween(50, 75),
            top: getRandomBetween(0, 10),
          })}
        >
          {errorMessage}
        </div>
      )}
      id="help-usa"
      label="Orange Man"
      value="Build the wall!"
      error="NO"
    />
    <Input
      errorComponent={({ errorMessage }) => (
        <div
          style={makeErrorStyles({
            left: getRandomBetween(0, 500),
            size: getRandomBetween(50, 75),
            top: getRandomBetween(0, 10),
          })}
        >
          {errorMessage}
        </div>
      )}
      id="error-without-label"
      value="Hate hate hate"
      error="ERROR"
    />
  </div>
</Form>
```

### With an Action Button

```jsx
import { UserIcon } from "@operational/components"
;<Input
  value="JNAPE92"
  label="Employee ID"
  icon={UserIcon}
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

### Can server as a unique Id input

```jsx
import * as React from "react"
import { Input, Form } from "@operational/components"

const [value, setValue] = React.useState("MyTable_01")

;<Form>
  <Input isUniqueId label="Enter Table name" value={value} onChange={setValue} />
  <Input
    data-cy="clearable-input-with-id-style"
    isUniqueId
    label="Also clearable"
    value={value}
    onChange={setValue}
    clear={() => setValue("")}
  />
</Form>
```

### Can have a custom status icon

```jsx
import * as React from "react"
import { Input, Form, SyncIcon, TimeIcon, SchemaIcon, WarningIcon } from "@operational/components"

const [value, setValue] = React.useState("MyTable_01")

;<Form>
  <Input label="With a status icon" value={value} onChange={setValue} statusIcon={<SyncIcon color="primary" />} />
  <Input isUniqueId label="Status icon with Id style" value={value} onChange={setValue} statusIcon={<SchemaIcon />} />
  <Input
    isUniqueId
    label="Enter Table name, can also be cleared"
    value={value}
    onChange={setValue}
    clear={() => setValue("")}
    statusIcon={<TimeIcon color="primary" />}
  />
  <Input
    fullWidth
    label="Can be full width too"
    value={value}
    onChange={setValue}
    statusIcon={<WarningIcon color="error" />}
  />
</Form>
```
