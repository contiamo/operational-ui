A textarea field, with optional label, hint and error.

### Simple usage

The following snippet show the text area with various visual additions handling fixed heights, errors and hints.

```jsx
import * as React from "react"
import { Textarea, Form, Icon } from "@operational/components"

const MyComponent = () => {
  const [v0, setV0] = React.useState("")
  const [v1, setV1] = React.useState("")
  const [v2, setV2] = React.useState("")
  const [v3, setV3] = React.useState("")
  const [v4, setV4] = React.useState("")
  const [v5, setV5] = React.useState("")
  const [v7, setV7] = React.useState("")
  const [v8, setV8] = React.useState("")
  const [v9, setV9] = React.useState("")
  const [v10, setV10] = React.useState("")

  return (
    <Form>
      <div>
        <Textarea value={v0} onChange={setV0} />
      </div>
      <div>
        <Textarea value={v1} onChange={setV1} label="simple" />
        <Textarea value={v4} onChange={setV4} label="with error" error="oh no!" />
        <Textarea value={v5} onChange={setV5} label="with hint" hint="this is a hint" />
        <Textarea label="disabled" disabled />
        <Textarea value={v7} onChange={setV7} label="a code" code />
        <Textarea value={v8} onChange={setV8} label="fixed height" height={200} />
      </div>
      <div>
        <Textarea copy value={v2} onChange={setV2} label="with copying" />
        <Textarea
          value={v3}
          onChange={setV3}
          label="with actions"
          action={
            <div>
              <Icon size={8} name="Open" />
              <a href="#textarea">More information</a>
            </div>
          }
        />
      </div>
      <div>
        <Textarea value={v10} onChange={setV10} label="full width" fullWidth />
      </div>
      <div>
        {/* full width without a label can behave differently */}
        <Textarea value={v9} onChange={setV9} fullWidth />
      </div>
    </Form>
  )
}

;<MyComponent />
```

### Submitting

Text areas detect a `cmd+enter` submit through an `onSubmit` prop, like so:

```jsx
import * as React from "react"
import { Textarea } from "@operational/components"

const MyOtherComponent = () => {
  const [value, setValue] = React.useState("Type something")
  const [submittedValue, setSubmittedValue] = React.useState(undefined)

  return (
    <>
      <Textarea value={value} onChange={setValue} onSubmit={() => setSubmittedValue(value)} />
      {submittedValue ? <p>Submitted: {submittedValue}</p> : <p>Submit by hitting cmd+enter</p>}
    </>
  )
}

;<MyOtherComponent />
```
