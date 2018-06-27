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

### With help tooltip

```jsx
<Input value="12" label="Phone number" hint="Please use country code" />
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
