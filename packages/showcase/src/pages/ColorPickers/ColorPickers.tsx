import * as React from "react"

import Playground from "../../components/Playground/Playground"
import Table from "../../components/PropsTable/PropsTable"
import { ColorPicker, Card, CardHeader } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/ColorPickers.simple.snippet"
import propDescription from "./propDescription"

const ColorPickerPage = () => (
  <Card>
    <CardHeader>Color Picker</CardHeader>
    <p>
      Colors are an important part of any user interface. This calls for a reasonable control that allows a user to
      choose a color from a canvas. Our component library exposes such a control, as seen below.
    </p>
    {process.env.NODE_ENV !== "test" && <Playground snippet={String(simpleSnippet)} components={{ ColorPicker }} />}

    <h4>Props</h4>
    <Table props={propDescription} />
  </Card>
)

export default ColorPickerPage
