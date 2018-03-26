# Select

The Select component presents users with a list of information with single-choice or multiple-choice options. Select elements can have options filled onClick, and also support filters.

```js
const options = [
  { label: "Option 1", value: "one" },
  { label: "Option 2", value: "two" },
  { label: "Option 3", value: "three" },
  { label: "Option 4", value: "four" },
  { label: "Option 5", value: "five" },
  { label: "Option 6", value: "six" },
  { label: "Option 7", value: "seven" },
  { label: "Option 8", value: "eight" }
]

class ComponentWithSelect extends React.Component {
  state = {
    value: []
  }

  render() {
    return (
      <Select
        value={this.state.value}
        options={options}
        filterable
        placeholder="Choose an option"
        onChange={newValue => {
          this.setState(prevState => ({
            value: newValue
          }))
        }}
      />
    )
  }
}
```

## Return Value

The value prop passed to select is is either an `Option` object, or an Array of `Option` objects. If it is an
array, the component automatically becomes a multi-select. The shape of an Option object is described below.

```javascript
const option = {
  label: "any_string",
  value: "Any String"
}
```

## Props

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| options | An array of options to present to the user. This can be an empty array that is later populated onClick of the Select component using the onClick prop (described below) to fetch options beforehand. | Array | [] | No |
| onClick | A function that is called before the Select component opens. Useful for retrieving options to present to the user. | func |  | Yes |
| placeholder | A string displayed to the user when nothing is selected | string |  | Yes |
| disabled | Is the select box disabled? | boolean | false | Yes |
| multiple | Is it possible to select more than one option? This turns the `value` of the Select component into an array of Options instead of a single Option object | boolean | false | Yes |
| filterable | Can the options be filtered? | boolean | false | Yes |
| onFilter | A function that is invoked before the options are filtered. Useful to fetch new options based on the filter. | func |  | Yes |


