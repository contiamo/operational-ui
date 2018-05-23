A textarea field, with optionnal label, hint and error.

```jsx
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({value})
  }

  render() {
    const { value } = this.state;

    return (
      <div style={{display: "flex", flexDirection:"column"}}>
        <Textarea value={value} onChange={this.handleChange} label="simple" />
        <Textarea value={value} onChange={this.handleChange} label="with error" error="oh no!" />
        <Textarea value={value} onChange={this.handleChange} label="with hint" hint="this is a hint" />
        <Textarea value={value} onChange={this.handleChange} label="disabled" disabled />
        <Textarea value={value} onChange={this.handleChange} label="a code" code />
      </div>
    )
  }
};

<MyForm />
```