import * as React from "react"
import { Card, CardHeader, TitleType, Heading1Type, Heading2Type, BodyType, SmallType } from "@operational/components"

import Playground from "../../../components/Playground/Playground"
import Table from "../../../components/PropsTable/PropsTable"
import * as simpleSnippet from "./snippets/Typography.simple.snippet"

export default () => (
  <Card>
    <CardHeader>Typography</CardHeader>

    <p>
      <em>@operational/components</em> keeps typography styles, organized in 5 typography styles, as follows:
    </p>

    <Playground
      snippet={String(simpleSnippet)}
      components={{ TitleType, Heading1Type, Heading2Type, BodyType, SmallType }}
    />
  </Card>
)
