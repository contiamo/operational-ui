import * as React from "react"
import { ColorPicker, Card, CardHeader, Heading2Type } from "@operational/components"

import Playground from "../../../components/Playground/Playground"
import Table from "../../../components/PropsTable/PropsTable"
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

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription} />
  </Card>
)

export default ColorPickerPage
