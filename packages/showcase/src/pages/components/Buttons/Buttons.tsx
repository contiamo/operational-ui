import * as React from "react"

import Playground from "component-playground"

import Table from "../../../components/PropsTable/PropsTable"
import { Button as DemoButton, CardHeader } from "contiamo-ui-components"

import { toReactPlayground } from "../../../utils/snippet"
import collectionSnippet from "./snippets/collection.snippet"
import propDescription from "./propDescription"

export default () =>
  <div>
    <CardHeader>Buttons</CardHeader>

    <p>
      Buttons clearly indicate a point of interaction that allow users to perform actions in applications. On Contiamo,
      buttons exist independently, and in groups. These buttons can also take on any number of colors required.
    </p>

    <h4>Usage</h4>
    <Playground codeText={toReactPlayground(String(collectionSnippet))} scope={{ React, Button: DemoButton }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </div>
