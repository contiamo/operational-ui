A textarea field, with optional label, hint and error.

### Simple usage

The following snippet show the text area with various visual additions handling fixed heights, errors and hints.

```jsx
initialState = {
  v1: "",
  v2: "",
  v3: "",
  v4: "",
  v5: "",
  v6: "",
  v7: "",
  v8: "",
}

const handleChange = key => value => {
  setState(() => ({ [key]: value }))
}
;<Form>
  <Textarea value={state.v1} onChange={handleChange("v1")} label="simple" />
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
  <Textarea value={state.v4} onChange={handleChange("v4")} label="with error" error="oh no!" />
  <Textarea value={state.v5} onChange={handleChange("v5")} label="with hint" hint="this is a hint" />
  <Textarea value={state.v6} onChange={handleChange("v6")} label="disabled" disabled />
  <Textarea value={state.v7} onChange={handleChange("v7")} label="a code" code />
  <Textarea value={state.v8} onChange={handleChange("v8")} label="fixed height" height={200} />
</Form>
```

### Submitting

Text areas detect a `cmd+enter` submit through an `onSubmit` prop, like so:

```jsx
initialState = {
  value: "Type something",
  submittedValue: undefined,
}
;<>
  <Textarea
    value={state.value}
    onChange={newValue => setState(() => ({ value: newValue }))}
    onSubmit={() => setState(prevState => ({ submittedValue: prevState.value }))}
  />
  {state.submittedValue ? <p>Submitted: {state.submittedValue}</p> : <p>Submit by hitting cmd+enter</p>}
</>
```
