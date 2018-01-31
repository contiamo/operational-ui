import * as React from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { Input, Select, Checkbox, Fieldset, DatePicker, Card, CardHeader } from "@operational/components"

import Playground from "../../components/Playground"
import StaticContent from "../../components/StaticContent"
import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"

const inputSnippet = `
(() => {
  class StatefulInput extends React.Component {
    state = {
      value: ""
    }

    render() {
      return (
        <Input
          placeholder="Name here"
          label="Name"
          name="forForms"
          value={this.state.value}
          onChange={value => {
            this.setState(prevState => ({ value }))
          }}
        />
      )
    }
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <StatefulInput />
    </div>
  )
})()
`

const selectSnippet = `
(() => {
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

  return <ComponentWithSelect />
})()
`

const checkboxSnippet = `
(() => {
  class ComponentWithCheckbox extends React.Component {
    state = {
      selected: ["1"]
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

  return <ComponentWithCheckbox />
})()
`

const propDescription = {
  Input: [
    {
      name: "value",
      description:
        "The current value of the input field. You must always supply this from the parent component, as per https://facebook.github.io/react/docs/forms.html#controlled-components.",
      defaultValue: "",
      type: "string",
      optional: false
    },
    {
      name: "onChange",
      description:
        "Callback called when the input changes, with the new value as a string. This is used to update the value in the parent component, as per https://facebook.github.io/react/docs/forms.html#controlled-components.",
      defaultValue: "",
      type: "Func",
      optional: true
    },
    {
      name: "placeholder",
      description: "Text displayed when the input field has no value.",
      defaultValue: '""',
      type: "string",
      optional: true
    },
    {
      name: "name",
      description: "The name used to refer to the input, for forms.",
      defaultValue: "",
      type: "string",
      optional: true
    },
    {
      name: "disabled",
      description: "Disabled input",
      defaultValue: "null",
      type: "boolean",
      optional: true
    }
  ],
  Select: [
    {
      name: "options",
      description:
        "An array of options to present to the user. This can be an empty array that is later populated onClick of the Select component using the onClick prop (described below) to fetch options beforehand.",
      defaultValue: "[]",
      type: "Array",
      optional: false
    },
    {
      name: "onClick",
      description:
        "A function that is called before the Select component opens. Useful for retrieving options to present to the user.",
      defaultValue: "",
      type: "func",
      optional: true
    },
    {
      name: "placeholder",
      description: "A string displayed to the user when nothing is selected",
      defaultValue: "",
      type: "string",
      optional: true
    },
    {
      name: "disabled",
      description: "Is the select box disabled?",
      defaultValue: "false",
      type: "boolean",
      optional: true
    },
    {
      name: "multiple",
      description:
        "Is it possible to select more than one option? This turns the `value` of the Select component into an array of Options instead of a single Option object",
      defaultValue: "false",
      type: "boolean",
      optional: true
    },
    {
      name: "filterable",
      description: "Can the options be filtered?",
      defaultValue: "false",
      type: "boolean",
      optional: true
    },
    {
      name: "onFilter",
      description:
        "A function that is invoked before the options are filtered. Useful to fetch new options based on the filter.",
      defaultValue: "",
      type: "func",
      optional: true
    }
  ],
  Checkbox: [
    {
      name: "options",
      description: "All checkbox options",
      defaultValue: "",
      type: "string[]",
      optional: false
    },
    {
      name: "selected",
      description: "Selected options",
      defaultValue: "",
      type: "string[]",
      optional: false
    },
    {
      name: "onChange",
      description: "Change callback, passing a full list of the new current selected options.",
      defaultValue: "() => void",
      type: "(newSelected: string[]) => void",
      optional: true
    }
  ]
}

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        Operational interfaces are rich in data entry options of various kinds. This page documents the basics such as
        inputs, select fields and radio buttons. More complicated data entry components, such as date- and color
        pickers, have their own page.
      </p>

      <p>
        To enhance accessibility, and Operational UI has first-class prop for labels. Simply add a `label` prop to any
        data entry component to show a label element. Make sure to supply an `id` prop also, to make sure there's no
        conflict between the autogenerated ones.
      </p>

      <h2>Input</h2>

      <h3>Usage</h3>
      <Playground snippet={inputSnippet} components={{ Input }} />

      <h3>Props</h3>
      <Table props={propDescription.Input} />

      <h2>Select</h2>
      <p>
        The Select component presents users with a list of information with single-choice or multiple-choice options.
        Select elements can have options filled onClick, and also support filters.
      </p>

      <Playground snippet={selectSnippet} components={{ Select }} />

      <StaticContent
        markdownContent={`
## Return Value

The value prop passed to select is is either an \`Option\` object, or an Array of \`Option\` objects. If it is an
array, the component automatically becomes a multi-select. The shape of an Option object is described below.

\`\`\`javascript
const option = {
  label: "any_string",
  value: "Any String"
}
\`\`\`
      `}
      />

      <h3>Props</h3>
      <Table props={propDescription.Select} />

      <h2>Checkbox</h2>
      <p>
        The Select component presents users with a list of information with single-choice or multiple-choice options.
        Select elements can have options filled onClick, and also support filters.
      </p>

      <Playground snippet={checkboxSnippet} components={{ Checkbox }} />

      <h3>Props</h3>
      <Table props={propDescription.Checkbox} />

      <h2>Organizing forms</h2>

      <p>
        The Fieldset component can be used to group multiple form elements, layout them out under a common legend. These
        fieldsets stay together when used in a multi-column layout.
      </p>

      <p>
        Since there is very little code involved in laying out fieldsets in a multi-column form, this library doesn't
        provide a Form component, leaving its implementation up to the user.
      </p>

      <form style={{ display: "flex", alignItems: "baseline" }}>
        <Fieldset legend="Customer">
          <Input label="First name" value="John" />
          <Input label="Last name" value="John" />
          <DatePicker label="Date of birth" />
        </Fieldset>
        <Fieldset legend="Product" css={{ marginLeft: 30 }}>
          <Input label="Type" value="John" />
        </Fieldset>
        <Fieldset legend="Customer" css={{ marginLeft: 30 }}>
          <Input label="First name" value="John" />
          <Input label="Last name" value="John" />
          <DatePicker label="Date of birth" />
        </Fieldset>
      </form>
    </Card>
  </Layout>
)
