# Date Pickers

DatePickers can currently be used to pick an period bound by two day selections.

## Usage

```js
class ComponentWithDatePicker extends React.Component {
  state = {
    start: "2017-10-03",
    end: "2017-10-18"
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
```

## Props

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| start | Start date in the format 2012-10-01. | string | - | Yes |
| end | End date in the format 2012-10-01. | string | - | Yes |
| onChange | Triggered every time the start or end dates change. | (change: {start: string, end: string}) => void | - | Yes |
| placeholder | Placeholder text when no dates selected | string |  | Yes |
