import * as React from "react"

import Playground from "component-playground"

import Table from "../../../components/PropsTable/PropsTable"
import { Icon as DemoIcon, CardHeader } from "contiamo-ui-components"

import * as snippet from "./snippets/collection.snippet"
import { toReactPlayground } from "../../../utils/snippet"
import propDescription from "./propDescription"

export default () =>
  <div>
    <CardHeader>Icons</CardHeader>

    <p>
      Contiamo's SVG icon set as a single component. It abstracts over different types of icons (react-feather, custom
      shapes, SVG sprites) to provide a consistent API as the icon set evolves.
    </p>

    <h4>Usage</h4>
    <Playground codeText={toReactPlayground(String(snippet))} scope={{ React, Icon: DemoIcon }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </div>
