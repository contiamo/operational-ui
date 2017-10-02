import * as React from "react"

import Playground from "../../components/Playground/Playground"
import SyntaxHighlighter from "react-syntax-highlighter"

import Table from "../../components/PropsTable/PropsTable"
import { Input, Select, Card, CardHeader } from "contiamo-ui-components"

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

    <h4>Props</h4>
    <Table props={propDescription.Input} />

    <CardHeader>Select</CardHeader>
    <p>
      The Select component presents users with a list of information with single-choice or multiple-choice options.
      Select elements can have options filled onClick, and also support filters.
    </p>

    <Playground snippet={String(selectSnippet)} components={{ Select }} />

    <h4>Return Value</h4>
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

    <h4>Props</h4>
    <Table props={propDescription.Select} />
  </Card>
)
