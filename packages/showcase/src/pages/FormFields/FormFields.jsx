// @flow
import React from "react"

import Playground from "component-playground"
import SyntaxHighlighter from "react-syntax-highlighter"

import Table from "../../components/PropsTable/PropsTable"
import { Input as DemoInput } from "contiamo-ui-components"
import { Select as DemoSelect } from "contiamo-ui-components"

import inputSnippet from "./snippets/input.snippet"
import selectSnippet from "./snippets/select.snippet"
import optionSnippet from "./snippets/option"
import propDescription from "./propDescription"
import { toReactPlayground } from "../../utils/snippet"

export default () =>
  <div>
    <h1>Form Fields</h1>

    <h2>
      Our applications tend to be composed of a myriad of form controls. This page seeks to document the vast majority
      of these controls.
    </h2>

    <hr />

    <h1>Input</h1>
    <h2>This component lives up to its name, allowing a user to input text, numbers, or other data.</h2>

    <Playground codeText={toReactPlayground(inputSnippet)} scope={{ React, Input: DemoInput }} />

    <h2>Props</h2>
    <Table props={propDescription.Input} />

    <hr />

    <h1>Select</h1>
    <h2>
      The Select component presents users with a list of information with single-choice or multiple-choice options.
    </h2>

    <p>Select elements can have options filled onClick, and also support filters.</p>

    <Playground codeText={toReactPlayground(selectSnippet)} scope={{ React, Select: DemoSelect }} />

    <h2>Return Value</h2>
    <p>
      The Select component holds its value in its `state`. The value is either an `Option` object, or an Array of
      `Option` objects, depending on the `multiple` prop.
    </p>
    <p>The shape of an Option object is described below.</p>
    <SyntaxHighlighter language="javascript">{optionSnippet}</SyntaxHighlighter>

    <h2>Props</h2>
    <Table props={propDescription.Select} />
  </div>
