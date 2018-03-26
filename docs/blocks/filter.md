# Filters

Filters are opinionated collections of form elements expanded through a modal. They display a very condensed summary of the current form state when the modal is not expanded.

## Usage

Simply nest `@operational/components` form elements using their API.

```js
(() => {
  class FilterContainer extends React.Component {
    state = {
      name: "Paul",
      occupation: "one",
      availability: {
        start: undefined,
        end: undefined
      }
    }

    render() {
      return (
        <Filter
          onClear={id => {
            if (id === "name") {
              this.setState(prevState => ({
                name: ""
              }))
            } else if (id === "occupation") {
              this.setState(prevState => ({
                occupation: null
              }))
            } else if (id === "availability") {
              this.setState(prevState => ({
                availability: {
                  start: null,
                  end: null
                }
              }))
            }
          }}
        >
          <Input
            label="Name"
            placeholder="Enter name"
            id="name"
            value={this.state.name}
            onChange={newValue => {
              this.setState(prevState => ({
                name: newValue
              }))
            }}
          />
          <Select
            id="occupation"
            label="Occupation"
            value={this.state.occupation}
            onChange={newVal => {
              this.setState(prevState => ({
                occupation: newVal
              }))
            }}
            options={[{ label: "One", value: "one" }, { label: "Two", value: "two" }]}
          />
          <DatePicker
            id="availability"
            label="Availability"
            start={this.state.availability.start}
            end={this.state.availability.end}
            onChange={data => {
              this.setState(prevState => ({
                availability: data
              }))
            }}
          />
        </Filter>
      )
    }
  }

  return <FilterContainer />
})()
```

## Props

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| children | contiamo-ui-components forms. Note that the `id` field is mandatory, compared to the case when the form fields are used on their own. | ReactNode | [] | Yes |
| onClear | Input fields may be cleared directly from the filter bar, in which case the `onClear` prop is called with the corresponding id. Actually clearing the filter is the responsibility of the parent. | (id: string) => void | - | Yes |
