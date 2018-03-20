# Switches

## Usage

```js
class ComponentWithSwitch extends React.Component {
  state = {
    on: true
  }
  render() {
    return (
      <Switch
        on={this.state.on}
        onChange={newOnState => {
          this.setState(prevState => ({
            on: newOnState
          }))
        }}
      />
    )
  }
}
```

## Props

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| on | Is the switch on? | boolean |  | No |
| onChange | A change handler. Passes the new `on` boolean. | func | void | Yes |
