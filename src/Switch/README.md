### Usage

```jsx
class ComponentWithSwitch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      on: true,
    }
  }

  render() {
    return (
      <Switch
        on={this.state.on}
        onChange={newOnState => {
          this.setState(prevState => ({
            on: newOnState,
          }))
        }}
      />
    )
  }
}

;<ComponentWithSwitch />
```
