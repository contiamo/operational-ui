### Usage

```jsx
initialState = {
  value: "",
}
;<Form>
  <Input
    value={state.value}
    onChange={value => {
      setState(prevState => ({ value }))
    }}
  />
  <Input
    placeholder="Name here"
    value={state.value}
    onChange={value => {
      setState(prevState => ({ value }))
    }}
  />
  <Input
    placeholder="flying-monkeys"
    label="Username"
    value={state.value}
    onChange={value => {
      setState(prevState => ({ value }))
    }}
  />
  <Input
    type="password"
    placeholder="Security to the max! 🔒"
    label="Password"
    name="password"
    value={state.value}
    onChange={value => {
      setState(prevState => ({ value }))
    }}
  />
  <div>
    <Input
      value={state.value}
      label="Phone number"
      hint="Your phone number is a wonderful construct that people can call you on. Phones are great. We love phones."
      onChange={value => {
        setState(prevState => ({ value }))
      }}
    />
  </div>
</Form>
```

### Clearable Value

```jsx
initialState = { value: "Clear me..." }
;<Input value={state.value} onChange={value => setState({ value })} clear={() => setState({ value: undefined })} />
```

### Pre-set Value

```jsx
<Input value="I came from an Autocomplete or something..." preset />
```

### With Locked State

```jsx
initialState = { isInputLocked: true }
;<Input
  value="My Storage Unit"
  label="Database Name"
  onToggle={() => setState({ isInputLocked: !state.isInputLocked })}
  disabled={state.isInputLocked}
  hint={state.isInputLocked ? "Click the lock to change this" : "This value can now be changed"}
/>
```

### With an Error

```jsx
<Form>
  <div>
    <Input id="help-usa" label="Orange Man" value="Build the wall!" error="Nope, unity." />
    <Input id="error-without-label" value="Hate hate hate" error="Too negative. Love." />
  </div>
</Form>
```

### With an Action Button

```jsx
<Input
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
<Input value="j08wejf08wejg01j3401jg" label="Your API Token" copy />
```

### Full Width

```jsx
<Input fullWidth value="Dave the Sheep" label="Hi, My Name is" />
```
