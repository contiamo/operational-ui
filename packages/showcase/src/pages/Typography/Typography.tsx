import * as React from "react"

import Playground from "../../components/Playground/Playground"
import Table from "../../components/PropsTable/PropsTable"
import { contiamoTheme, CardHeader, Card } from "contiamo-ui-components"

import * as snippet from "./snippets/Typography.snippet"

export default () => (
  <Card>
    <CardHeader>Typography</CardHeader>

    <p>
      <em>contiamo-ui-components</em> keeps typography styles: by default, there are two font sizes and weights,
      organized in 4 typography styles, as follows:
    </p>

    <Playground snippet={String(snippet)} components={{}} scope={{ theme: contiamoTheme }} />
  </Card>
)
