import * as React from "react"

import Playground from "../../../components/Playground/Playground"
import Table from "../../../components/PropsTable/PropsTable"
import { Card, CardHeader, TitleType, Heading1Type, Heading2Type, BodyType, SmallType } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/Typography.simple.snippet"

export default () => (
  <Card>
    <CardHeader>Typography</CardHeader>

    <p>
      <em>contiamo-ui-components</em> keeps typography styles, organized in 5 typography styles, as follows:
    </p>

    <Playground
      snippet={String(simpleSnippet)}
      components={{ TitleType, Heading1Type, Heading2Type, BodyType, SmallType }}
    />
  </Card>
)
