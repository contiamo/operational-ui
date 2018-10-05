### Usage

```jsx
class StatefulInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
    }
  }
  render() {
    return (
      <Input
        placeholder="Name here"
        inputId="input-id"
        label="Name"
        name="forForms"
        value={this.state.value}
        onChange={value => {
          this.setState(prevState => ({ value }))
        }}
      />
    )
  }
}

;<StatefulInput />
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

```jsx
initialState = { value: "Clear me..." }
;<Input
  value={state.value}
  onChange={value => setState({ value })}
  clear={() => setState({ value: undefined })}
  label="Phone number"
  hint="Please use country code"
/>
```

### With help tooltip

```jsx
<Input value="12" label="Phone number" hint="Please use country code" />
```

### With help tooltip

```jsx
<Input value="12" label="Phone number" hint="Please use country code" />
```

### In a small container

```jsx
<div style={{ width: 100, marginBottom: 16 }}>
  <Input value="12" label="Phone number" hint="Please use country code" />
</div>
<div style={{ width: 100 }}>
  <Input value="12" label="Phone number" hint="Please use country code" icon="Play" onIconClick={() => {}} />
</div>
```

### With toggle state

```jsx
<Input value="Database Name" label="Name" onToggle={() => {}} disabled={true} hint="This value cannot be changed" />
```

### With Error

```jsx
<Input value="12" label="Phone number" hint="Please use country code" error="Must be less than 12 characters" />
```

### With button

```jsx
<Input
  value="12"
  label="Phone number"
  hint="Please use country code"
  icon="User"
  onIconClick={() => {
    console.log("clicked icon")
  }}
/>
```

### With `copy` option

You can have a field with a "copy to clipboard" button with the `copy` prop.

```jsx
<Input value="go to my clipboard!" label="Something to save" copy />
```

### Full Width

#### With Label

```jsx
<Input fullWidth value="Dave the Sheep" label="Hi, my name is" />
```

#### Without a Label

```jsx
<Input fullWidth value="I feel naked" />
```
