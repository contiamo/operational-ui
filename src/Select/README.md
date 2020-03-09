The Select component presents users with a list of information with single-choice or multiple-choice options. Select elements can have options filled onClick, and also support filters.

It implements the specification for a **Collapsible Dropdown Listbox** according to [WAI-ARIA v1.1](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html).

### Basic usage

If the component is used with a string `value` prop, it behaves as a single select. Every time the value is changed, the options pop-up closes automatically. The `onChange` handler gives you the new value, and the option that was clicked as arguments. It is of the shape `(newValue: Value, changed: IOption) => void`.

```jsx
import * as React from "react"
import { Select, Code } from "@operational/components"

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
  const [lastChanged, setLastChanged] = React.useState(null)

  return (
    <>
      <Select
        id="basic"
        label="Basic"
        data-cy="basic-select"
        value={value}
        options={options}
        onChange={(newValue, lastChanged) => {
          setValue(newValue as string)
          setLastChanged(lastChanged)
        }}
      />
      <Code>
        {`
Current value: ${value}
Last changed option:

${JSON.stringify(lastChanged, null, 2)}
      `}
      </Code>
    </>
  )
}

;<MyComponent />
```

If options are provided without labels, values are be displayed in the list.

```jsx
import * as React from "react"
import { Select, Code } from "@operational/components"

const options = [
  { value: "one" },
  { value: "two" },
  { value: "three" },
  { value: "four" },
  { value: "five" },
  { value: "six" },
  { value: "seven" },
  { value: "eight" },
]

const MyComponent = () => {
  const [value, setValue] = React.useState("one")
  const [lastChanged, setLastChanged] = React.useState(null)

  return (
    <>
      <Select
        id="basic-no-labels"
        label="Without labels"
        data-cy="basic-select-no-labels"
        value={value}
        options={options}
        onChange={(newValue, lastChanged) => {
          setValue(newValue as string)
          setLastChanged(lastChanged)
        }}
      />
      <Code>
        {`
Current value: ${value}
Last changed option:

${JSON.stringify(lastChanged, null, 2)}
      `}
      </Code>
    </>
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
      onChange={newValue => setValue(newValue as string[])}
      filterable
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
      onChange={newValue => setValue(newValue as string)}
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
      onChange={newValue => setValue(newValue as string)}
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
    <div style={{ width: "100%", display:"grid", gridGap: "10px"}}>
      <div style={{ width: "100%", background: "#666", display: "" }}>
        <Select
          value={value}
          options={options}
          filterable
          placeholder="Choose an option"
          onChange={newValue => setValue(newValue as string)}
        />
      </div>
      <div style={{ width: "100%", background: "#666", display: "" }}>
        <Select
          color="white"
          value={value}
          naked
          options={options}
          filterable
          placeholder="Choose an option"
          onChange={newValue => setValue(newValue as string)}
        />
      </div>
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
      onChange={newValue => setValue(newValue as string)}
    />
  )
}

;<MyComponent />
```

### With a Custom Input

In case of offering users a choice CSV delimiters, we have a few predefined ideas, but they can really be anything. In this case, let's offer them a custom option using the `customOption` property.

```jsx
import * as React from "react"
import { Select, Form, Code } from "@operational/components"

const options = [
  { label: "Option 1", value: "one" },
  { label: "Option 2", value: "two" },
  { label: "Option 3", value: "three" },
]

const MyComponent = () => {
  const [value, setValue] = React.useState("one")
  const [lastChanged, setLastChanged] = React.useState(null)
  const [customOptionValue, setCustomOptionValue] = React.useState("chickens")

  return (
    <Form>
      <Select
        data-cy="custom-select"
        value={value}
        options={options}
        label="Custom Input"
        placeholder="Choose an option"
        customOption={{ label: "Custom...", value: customOptionValue }}
        onChange={(newValue, lastChanged) => {
          setValue(newValue as string)
          if (lastChanged && lastChanged.label === "Custom...") {
            setCustomOptionValue(newValue as string)
          }
          setLastChanged(lastChanged)
        }}
      />
      <Code>
        {`
Current value: ${String(value)}
Last changed option:

${JSON.stringify(lastChanged, null, 2)}
      `}
      </Code>
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

### Custom Input exposes onBlur callback

Let's say we would like to prevent user leaving the custom input value empty, but still would like to allow user clean up the input before starting entering something new. We can use onInputBlur callback to implement such behaviour.

```jsx
import * as React from "react"
import { Select, Form, Code } from "@operational/components"

const options = [
  { label: "Option 1", value: "one" },
  { label: "Option 2", value: "two" },
  { label: "Option 3", value: "three" },
]

const MyComponent = () => {
  const [value, setValue] = React.useState("one")
  const [lastChanged, setLastChanged] = React.useState(null)
  const [customOptionValue, setCustomOptionValue] = React.useState("chickens")

  const onBlurHandler = value => {
    if (value === "") {
      setValue("chickens are back")
      setCustomOptionValue("chickens are back")
    }
  }

  return (
    <Form>
      <Select
        data-cy="custom-select"
        value={value}
        options={options}
        label="Custom Input"
        placeholder="Choose an option"
        customOption={{ label: "Custom...", value: customOptionValue }}
        onChange={(newValue, lastChanged) => {
          setValue(String(newValue))
          if (lastChanged && lastChanged.label === "Custom...") {
            setCustomOptionValue(String(newValue))
          }
          setLastChanged(lastChanged)
        }}
        customInputSettings={{
          onBlur: onBlurHandler,
        }}
      />
      <Code>
        {`
Current value: ${String(value)}
Last changed option:

${JSON.stringify(lastChanged, null, 2)}
      `}
      </Code>
    </Form>
  )
}

;<MyComponent />
```

### Very wide option

```jsx
import * as React from "react"
import { Select, Code } from "@operational/components"
const options = [
  { label: "Very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong option", value: "one" },
  { label: "Short", value: "two" },
]
const MyComponent = () => {
  const [value, setValue] = React.useState("one")
  const [lastChanged, setLastChanged] = React.useState(null)
  return (
    <>
      <Select
        id="maxWidth"
        label="Max width"
        data-cy="maxWidth-select"
        value={value}
        options={options}
        onChange={(newValue, lastChanged) => {
          setValue(newValue as string)
          setLastChanged(lastChanged)
        }}
      />
      <Code>
        {`
Current value: ${value}
Last changed option:
${JSON.stringify(lastChanged, null, 2)}
      `}
      </Code>
    </>
  )
}
;<MyComponent />
```

### Select in Modal

```jsx
import * as React from "react"
import { Select, Code, Modal } from "@operational/components"
const options = [
  { label: "Very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong option", value: "one" },
  { label: "Short", value: "two" },
]
const MyComponent = () => {
  const [value, setValue] = React.useState("one")
  const [lastChanged, setLastChanged] = React.useState(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  return (
    <>
      <div onClick={() => setIsModalOpen(true)}>Trigger the Modal</div>
      <Modal isOpen={isModalOpen} onClickOutside={() => setIsModalOpen(false)} title="What's up?">
        <Select
        id="modal"
        label="In modal"
        data-cy="inModal-select"
        value={value}
        options={options}
        onChange={(newValue, lastChanged) => {
          setValue(newValue as string)
          setLastChanged(lastChanged)
        }}
      />
      <Code>
        {`
Current value: ${value}
Last changed option:
${JSON.stringify(lastChanged, null, 2)}
      `}
      </Code>
      </Modal>
    </>
  )
}
;<MyComponent />
```
