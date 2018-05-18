### Usage

```jsx
class StatefulInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
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

<StatefulInput />
```