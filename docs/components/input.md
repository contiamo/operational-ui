# Input

## Usage

```js
class StatefulInput extends React.Component {
  state = {
    value: ""
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
```

## Props

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| value | The current value of the input field. You must always supply this from the parent component, as per https://facebook.github.io/react/docs/forms.html#controlled-components. | string |  | No |
| onChange | Callback called when the input changes, with the new value as a string. This is used to update the value in the parent component, as per https://facebook.github.io/react/docs/forms.html#controlled-components. | Func |  | Yes |
| placeholder | Text displayed when the input field has no value. | string | "" | Yes |
| name | The name used to refer to the input, for forms. | string |  | Yes |
| label | Label text, rendering the input inside a <label> tag if specified. The `inputId` props is responsible for specifying for and id attributes. | string |  | Yes |
| inputId | Specifies the id that should be used when hooking up label for attributes with input id attributes, if a label is present. | string |  | Yes |
| disabled | Disabled input | boolean | null | Yes |
