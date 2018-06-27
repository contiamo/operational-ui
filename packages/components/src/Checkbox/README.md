### Usage

```jsx
class ComponentWithCheckbox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: ["1"],
    }
  }
  render() {
    return (
      <Checkbox
        label="Something"
        options={["1", "2", "3"]}
        selected={this.state.selected}
        onChange={n => {
          this.setState(p => ({
            selected: n,
          }))
        }}
      />
    )
  }
}

;<ComponentWithCheckbox />
```
