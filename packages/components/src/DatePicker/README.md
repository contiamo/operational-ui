DatePickers can currently be used to pick an period bound by two day selections.

### Usage

```jsx
class ComponentWithDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: "2017-10-03",
      end: "2017-10-18"
    }
  }

  render() {
    return (
      <DatePicker
        start={this.state.start}
        end={this.state.end}
        placeholder="Pick a date"
        onChange={newState => {
          this.setState(prevState => newState)
        }}
      />
    )
  }
}

<ComponentWithDatePicker />
```