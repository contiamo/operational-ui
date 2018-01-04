import * as React from "react"
import { Card, CardHeader, TitleType, Heading1Type, Heading2Type, BodyType, SmallType } from "@operational/components"

import Playground from "../../components/Playground"
import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"

const simpleSnippet = `
  <div>
    <TitleType>I am a title.</TitleType>
    <Heading1Type>I am a heading1.</Heading1Type>
    <Heading2Type>I am a heading2.</Heading2Type>
    <BodyType>I am a regular body section. Feel free to paint me olive.</BodyType>
    <SmallType>I am a little smaller than that.</SmallType>
  </div>
`

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        <em>@operational/components</em> keeps typography styles, organized in 5 typography styles, as follows:
      </p>

      <Playground
        snippet={String(simpleSnippet)}
        components={{ TitleType, Heading1Type, Heading2Type, BodyType, SmallType }}
      />
    </Card>
  </Layout>
)
