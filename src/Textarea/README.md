A textarea field, with optional label, hint and error.

### Simple usage

The following snippet show the text area with various visual additions handling fixed heights, errors and hints.

```jsx
json = JSON.stringify({ test: 123 }, null, 2)

initialState = {
  v1: "",
  v2: "",
  v3: "",
  v4: "",
  v5: "",
  v6: "",
  v7: "",
  v8: "",
  v9: "",
}

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
;<Form>
  <div>
    <Textarea value={state.v1} onChange={handleChange("v1")} label="simple" />
    <Textarea value={state.v4} onChange={handleChange("v4")} label="with error" error="oh no!" />
    <Textarea value={state.v5} onChange={handleChange("v5")} label="with hint" hint="this is a hint" />
    <Textarea value={state.v6} onChange={handleChange("v6")} label="disabled" disabled />
    <Textarea value={state.v7} onChange={handleChange("v7")} label="a code" code />
    <Textarea value={state.v8} onChange={handleChange("v8")} label="fixed height" height={200} />
    <Textarea value={state.v8} onChange={handleChange("v8")} label="with placeholder" placeholder={json} />
  </div>
  <div>
    <Textarea copy value={state.v2} onChange={handleChange("v2")} label="with copying" />
    <Textarea
      value={state.v3}
      onChange={handleChange("v3")}
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
    <Textarea value={state.v9} onChange={handleChange("v9")} label="full width" fullWidth />
  </div>
  <div>
    {/* full width without a label can behave differently */}
    <Textarea value={state.v9} onChange={handleChange("v9")} fullWidth />
  </div>
</Form>
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
