// @flow
import React from "react"

import Playground from "component-playground"

import Table from "../../components/PropsTable/PropsTable"
import { Icon as DemoIcon } from "contiamo-ui-components"

import snippet from "./snippet"
import propDescription from "./propDescription"

export default () =>
  <div>
    <h1>Icons</h1>

    <h2>
      Contiamo's SVG icon set as a single component. It abstracts over
      different types of icons (react-feather, custom shapes, SVG sprites)
      to provide a consistent API as the icon set evolves.
    </h2>

    <h2>Usage</h2>
    <Playground codeText={snippet} scope={{ React, Icon: DemoIcon }} />

    <h2>Props</h2>
    <Table props={propDescription} />
  </div>
