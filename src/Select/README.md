The Select component presents users with a list of information with single-choice or multiple-choice options. Select elements can have options filled onClick, and also support filters.

It implements the specification for a **Collapsible Dropdown Listbox Example** according to [WAI-ARIA v1.1](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html).

### Basic usage

If the component is used with a string `value` prop, it behaves as a single select. Every time the value is changed, the options pop-up closes automatically.

```jsx
import * as React from "react"
import { Select } from "@operational/components"

const options = [
  { label: "Option 1", value: "one" },
  { label: "Option 2", value: "two" },
  { label: "Option 3", value: "three" },
  { label: "Option 4", value: "four" },
  { label: "Option 5", value: "five" },
  { label: "Option 6", value: "six" },
  { label: "Option 7", value: "seven" },
  { label: "Option 8", value: "eight" },
]

const MyComponent = () => {
  const [value, setValue] = React.useState("one")

  return (
    <Select
      id="basic"
      label="Basic"
      data-cy="basic-select"
      value={value}
      options={options}
      onChange={newValue => setValue(newValue)}
    />
  )
}

;<MyComponent />
```

### Usage as multiselect

Using an array prop in the `value` makes the component work as multiselect. The pop-up stays open so that additional values may be added.

```jsx
import * as React from "react"
import { Select } from "@operational/components"

const options = [
  { label: "Option 1", value: "one" },
  { label: "Option 2", value: "two" },
  { label: "Option 3", value: "three" },
  { label: "Option 4", value: "four" },
  { label: "Option 5", value: "five" },
  { label: "Option 6", value: "six" },
  { label: "Option 7", value: "seven" },
  { label: "Option 8", value: "eight" },
]

const MyOtherComponent = () => {
  const [value, setValue] = React.useState([])
  return (
    <Select
      data-cy="multi-select"
      label="Select label"
      value={value}
      options={options}
      placeholder="Choose an option"
      onChange={setValue}
    />
  )
}

;<MyOtherComponent />
```

### Filterable

Sometimes, if you have a lot of options, filtering through them might be helpful. Here's how you'd do that using a `filterable` prop.

```jsx
import * as React from "react"
import { Select } from "@operational/components"

const options = [
  { label: "Option 1", value: "one" },
  { label: "Option 2", value: "two" },
  { label: "Option 3", value: "three" },
  { label: "Option 4", value: "four" },
  { label: "Option 5", value: "five" },
  { label: "Option 6", value: "six" },
  { label: "Option 7", value: "seven" },
  { label: "Option 8", value: "eight" },
]

const MyThirdComponent = () => {
  const [value, setValue] = React.useState("one")
  return (
    <Select
      data-cy="filterable-select"
      label="Select label"
      value={value}
      options={options}
      filterable
      placeholder="Choose an option"
      onChange={setValue}
    />
  )
}

;<MyThirdComponent />
```

### With `maxOptions`

If you have a huge list from a backend, you can limit the number of options displayed to avoid rendering performance issues. Just add `maxOptions` and it's done. Please note that without the `filterable` option enabled, some options can't be selected.

```jsx
import * as React from "react"
import { Select } from "@operational/components"

const options = [
  { label: "Option 1", value: "one" },
  { label: "Option 2", value: "two" },
  { label: "Option 3", value: "three" },
  { label: "Option 4", value: "four" },
  { label: "Option 5", value: "five" },
  { label: "Option 6", value: "six" },
  { label: "Option 7", value: "seven" },
  { label: "Option 8", value: "eight" },
]

const MyThirdComponent = () => {
  const [value, setValue] = React.useState("one")
  return (
    <Select
      data-cy="maxOptions-select"
      label="Select label"
      value={value}
      options={options}
      filterable
      maxOptions={2}
      placeholder="Choose an option"
      onChange={setValue}
    />
  )
}

;<MyThirdComponent />
```

### Naked

Sometimes, you might have a need to render a `Select` without any surrounding chrome. The `naked` prop renders the component in a number of different contexts.

```jsx
import * as React from "react"
import { Select } from "@operational/components"

const options = [
  { label: "Option 1", value: "one" },
  { label: "Option 2", value: "two" },
  { label: "Option 3", value: "three" },
  { label: "Option 4", value: "four" },
  { label: "Option 5", value: "five" },
  { label: "Option 6", value: "six" },
  { label: "Option 7", value: "seven" },
  { label: "Option 8", value: "eight" },
]

const MyComponent = () => {
  const [value, setValue] = React.useState("one")

  return (
    <div style={{ width: "100%", background: "#666" }}>
      <Select
        color="white"
        value={value}
        naked
        options={options}
        filterable
        placeholder="Choose an option"
        onChange={setValue}
      />
    </div>
  )
}

;<MyComponent />
```

### Disabled

In some cases, `Select`s must be disabled. We achieve this using the `disabled` prop.

```jsx
import * as React from "react"
import { Select } from "@operational/components"

const options = [
  { label: "Option 1", value: "one" },
  { label: "Option 2", value: "two" },
  { label: "Option 3", value: "three" },
  { label: "Option 4", value: "four" },
  { label: "Option 5", value: "five" },
  { label: "Option 6", value: "six" },
  { label: "Option 7", value: "seven" },
  { label: "Option 8", value: "eight" },
]

const MyComponent = () => {
  const [value, setValue] = React.useState("one")

  return (
    <Select
      data-cy="disabled-select"
      disabled
      value={value}
      options={options}
      label="Disabled"
      placeholder="Choose an option"
      onChange={setValue}
    />
  )
}

;<MyComponent />
```

### With a Custom Input

In case of offering users a choice CSV delimiters, we have a few predefined ideas, but they can really be anything. In this case, let's offer them a custom option using the `customOption` property.

```jsx
import * as React from "react"
import { Select, Form } from "@operational/components"

const options = [
  { label: "Option 1", value: "one" },
  { label: "Option 2", value: "two" },
  { label: "Option 3", value: "three" },
]

const MyComponent = () => {
  const [value1, setValue1] = React.useState("one")
  const [value2, setValue2] = React.useState("one")

  return (
    <Form>
      <Select
        data-cy="custom-select"
        value={value1}
        options={options}
        label="Custom Input"
        placeholder="Choose an option"
        customOption="Custom..."
        onChange={setValue1}
      />
      <Select
        value={value2}
        options={options}
        label="Custom Input"
        filterable
        placeholder="Choose an option"
        customOption="Custom..."
        onChange={setValue2}
      />
    </Form>
  )
}

;<MyComponent />
```

### Return Value

The value prop passed to select is either an `Option` object, or an Array of `Option` objects. If it is an
array, the component automatically becomes a multi-select. The shape of an Option object is described below.

```ts
import { SelectProps } from "@operational/components"

const option: SelectProps["options"][-1] = {
  label: "any_string",
  value: "Any String",
}
```
