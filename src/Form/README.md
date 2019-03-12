### Usage

```jsx
import * as React from "react"
import { Form, Input, Button } from "@operational/components"
;<Form>
  <Input label="Name" value="my bundle" />
  <Input label="Git URL" value="git://github.com/me/my-bundle" />
  <Input label="Branch" value="master" />
  <Button color="primary">Import</Button>
</Form>
```

### With group

For grouping some elements together in one line, just wrap them in a simple `div`

```jsx
import * as React from "react"
import { Form, Input, Autocomplete, Select, Button } from "@operational/components"
;<Form>
  <div>
    <Input label="Name" value="Steve Jobs" />
    <Autocomplete
      value=""
      loading={false}
      label="Find a Good Boye 🐶"
      hint={`Try "Husky"`}
      onResultClick={result => {}}
      onChange={() => {}}
    />
    <Select
      label="Select label"
      value="one"
      options={[
        { label: "Option 1", value: "one" },
        { label: "Option 2", value: "two" },
        { label: "Option 3", value: "three" },
        { label: "Option 4", value: "four" },
        { label: "Option 5", value: "five" },
        { label: "Option 6", value: "six" },
        { label: "Option 7", value: "seven" },
        { label: "Option 8", value: "eight" },
      ]}
      filterable
      maxOptions={2}
      placeholder="Choose an option"
      onChange={() => {}}
    />
    <Autocomplete
      value="Hello"
      label="Find a Good Boye 🐶"
      hint={`Try "Husky"`}
      onChange={() => {}}
      onResultClick={() => {}}
    />
  </div>
  <div>
    <Input label="Branch" value="master" />
    <Button color="primary">Import</Button>
  </div>
  <div>
    <Input label="Branch" value="develop" />
    <Button color="primary">Import</Button>
    <Button color="grey">Import</Button>
  </div>
  <p>This is a footer!</p>
</Form>
```

## Correct Layout for Conditionally Rendered Components

```jsx
import * as React from "react"
import { Form, Input, Autocomplete, Select, Button, Switch } from "@operational/components"

const MyComponent = () => {
  const [mode, setMode] = React.useState("autocomplete")
  return (
    <Form>
      <div>
        <Switch
          left="Select"
          right="Autocomplete"
          on={mode === "autocomplete"}
          onChange={() => setMode(mode === "select" ? "autocomplete" : "select")}
        />
        {mode === "select" && (
          <Select
            label="Select label"
            value="hello"
            options={[{ value: "hello", label: "Eminem" }]}
            filterable
            maxOptions={2}
            placeholder="Choose an option"
            onChange={() => {}}
          />
        )}
        {mode === "autocomplete" && (
          <Autocomplete
            value=""
            label="Find a Good Boye 🐶"
            hint={`Try "Husky"`}
            onChange={() => {}}
            onResultClick={() => {}}
          />
        )}
      </div>
    </Form>
  )
}

;<MyComponent />
```
