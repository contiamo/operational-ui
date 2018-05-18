### Usage

```jsx
class ComponentWithCheckbox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: ["1"]
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
            selected: n
          }))
        }}
      />
    )
  }
}

<ComponentWithCheckbox />
```

## Props

| Name     | Description                                                               | Type                            | Default    | Required |
| :------- | :------------------------------------------------------------------------ | :------------------------------ | :--------- | :------- |
| options  | All checkbox options                                                      | string[]                        |            | No       |
| selected | Selected options                                                          | string[]                        |            | No       |
| onChange | Change callback, passing a full list of the new current selected options. | (newSelected: string[]) => void | () => void | Yes      |
