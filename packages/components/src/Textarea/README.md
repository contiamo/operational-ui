A textarea field, with optional label, hint and error.

```jsx
class MyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      v1: "",
      v2: "",
      v3: "",
      v4: "",
      v5: "",
      v6: "",
    }
    this.handleChange = key => value => {
      this.setState({ [key]: value })
    }
  }

  render() {
    const { v1, v2, v3, v4, v5, v6 } = this.state

    return (
      <Form>
        <Textarea value={v1} onChange={this.handleChange("v1")} label="simple" />
        <Textarea
          copy
          value={v2}
          onChange={this.handleChange("v2")}
          label="with copying"
          action={
            <div>
              <Icon size={8} name="Copy" />
              <a href="#textarea">Copy to clipboard</a>
            </div>
          }
        />
        <Textarea value={v3} onChange={this.handleChange("v3")} label="with error" error="oh no!" />
        <Textarea value={v4} onChange={this.handleChange("v4")} label="with hint" hint="this is a hint" />
        <Textarea value={v5} onChange={this.handleChange("v5")} label="disabled" disabled />
        <Textarea value={v6} onChange={this.handleChange("v6")} label="a code" code />
      </Form>
    )
  }
}

;<MyForm />
```
