// @flow
import React from "react"

import Playground from "component-playground"

import Table from "../../components/PropsTable/PropsTable"
import DemoInput from "../../../components/Input/Input"
import DemoSelect from "../../../components/Select/Select"

import snippet from "./snippet"
import propDescription from "./propDescription"

export default () =>
  <div>
    <DemoSelect
      filterable
      placeholder="SUP DAWG"
      options={[
        {
          id: 1,
          label: "Option 1",
          value: 100
        },
        {
          id: 2,
          label: "Option 2 is better",
          value: 100
        },
        {
          id: 3,
          label: "Option 2 lies, I am better",
          value: 100
        },
        {
          id: 4,
          label: "Pizza is cool",
          value: 100
        },
        {
          id: 5,
          label: "Eugene is the coolest",
          value: 100
        }
      ]}
    />
    <h1>Form Fields</h1>

    <h2>
      Our applications tend to be composed of a myriad of form controls. This
      page seeks to document the vast majority of these controls.
    </h2>

    <h1>Input</h1>

    <h2>Usage</h2>
    <Playground
      codeText={snippet.Input}
      scope={{ React, TextInput: DemoInput }}
    />

    <h2>Props</h2>
    <Table props={propDescription.Input} />
  </div>
