// @flow
import React from "react"

import Playground from "component-playground"

import Table from "../../components/PropsTable/PropsTable"
import DemoButton from "../../../components/Button/Button"

import snippet from "./snippet"
import propDescription from "./propDescription"

export default () =>
  <div>
    <h1>Buttons</h1>

    <h2>
      Buttons clearly indicate a point of interaction that allow users to
      perform actions in applications.
    </h2>

    <p>
      On Contiamo, buttons exist independently, and in groups. These buttons can
      also take on any number of colors required.
    </p>

    <h2>Usage</h2>
    <Playground codeText={snippet} scope={{ React, Button: DemoButton }} />

    <h2>Props</h2>
    <Table props={propDescription} />
  </div>
