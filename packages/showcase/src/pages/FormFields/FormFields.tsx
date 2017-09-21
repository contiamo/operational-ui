import * as React from "react"

import Playground from "../../components/Playground/Playground"
import SyntaxHighlighter from "react-syntax-highlighter"

import Table from "../../components/PropsTable/PropsTable"
import { Input, Select, CardHeader } from "contiamo-ui-components"

import * as inputSnippet from "./snippets/input.snippet"
import * as selectSnippet from "./snippets/select.snippet"
import optionSnippet from "./snippets/option"
import propDescription from "./propDescription"

export default () => (
  <div>
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
    <SyntaxHighlighter language="javascript">{optionSnippet}</SyntaxHighlighter>

    <h4>Props</h4>
    <Table props={propDescription.Select} />
  </div>
)
