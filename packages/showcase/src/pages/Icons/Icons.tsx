import * as React from "react"

import Playground from "../../components/Playground/Playground"

import Table from "../../components/PropsTable/PropsTable"
import { Icon, CardHeader } from "@contiamo/ui"

import * as simpleSnippet from "./snippets/Icons.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <div>
    <CardHeader>Icons</CardHeader>

    <p>
      Contiamo's SVG icon set as a single component. It abstracts over different types of icons (react-feather, custom
      shapes, SVG sprites) to provide a consistent API as the icon set evolves.
    </p>

    <h4>Usage</h4>
    <Playground snippet={String(simpleSnippet)} components={{ Icon }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </div>
)
