import * as React from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { Input, Select, Fieldset, DatePicker, Card, CardHeader, Heading2Type } from "@operational/components"

import Playground from "../../../components/Playground/Playground"
import Table from "../../../components/PropsTable/PropsTable"
import * as inputSnippet from "./snippets/FormFields.input.snippet"
import * as selectSnippet from "./snippets/FormFields.select.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Form Fields</CardHeader>

    <p>
      Our applications tend to be composed of a myriad of form controls.<br />This page seeks to document the vast
      majority of these controls.
    </p>

    <CardHeader>Input</CardHeader>
    <p>This component lives up to its name, allowing a user to input text, numbers, or other data.</p>

    <Playground snippet={String(inputSnippet)} components={{ Input }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription.Input} />

    <CardHeader>Select</CardHeader>
    <p>
      The Select component presents users with a list of information with single-choice or multiple-choice options.
      Select elements can have options filled onClick, and also support filters.
    </p>

    <Playground snippet={String(selectSnippet)} components={{ Select }} />

    <CardHeader>Organizing forms</CardHeader>

    <p>
      The Fieldset component can be used to group multiple form elements, layout them out under a common legend. These
      fieldsets stay together when used in a multi-column layout.
    </p>

    <p>
      Since there is very little code involved in laying out fieldsets in a multi-column form, this library doesn't
      provide a Form component, leaving its implementation up to the user.
    </p>

    <form style={{ columns: "3 200px" }}>
      <Fieldset legend="Customer">
        <Input label="First name" value="John" />
        <Input label="Last name" value="John" />
        <DatePicker label="Date of birth" />
      </Fieldset>
      <Fieldset legend="Product">
        <Input label="Type" value="John" />
      </Fieldset>
      <Fieldset legend="Customer">
        <Input label="First name" value="John" />
        <Input label="Last name" value="John" />
        <DatePicker label="Date of birth" />
      </Fieldset>
    </form>

    <Heading2Type>Return Value</Heading2Type>
    <p>
      The Select component holds its value in its `state`. The value is either an `Option` object, or an Array of
      `Option` objects, depending on the `multiple` prop. The shape of an Option object is described below.
    </p>

    {/* TODO: clean up inlining once markdown is introduced. */}
    <SyntaxHighlighter language="javascript">{`
Option {
  id: 1, // a number that is passed as a \`key\` in the React iterator,
  label: "Any string",
  value: (<div>Literally anything can go here</div>)
}
    `}</SyntaxHighlighter>

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription.Select} />
  </Card>
)
