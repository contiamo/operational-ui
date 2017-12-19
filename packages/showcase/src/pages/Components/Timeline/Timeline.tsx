import * as React from "react"
import { Link } from "react-router-dom"
import { Card, CardHeader, Timeline, TimelineItem, Heading2Type } from "@operational/components"

import Playground from "../../../components/Playground/Playground"
import Table from "../../../components/PropsTable/PropsTable"
import * as TimelineSnippet from "./snippets/Timeline.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Timeline</CardHeader>

    <p>Display information vertically on a timeline from top to bottom.</p>
    <Heading2Type>Usage</Heading2Type>
    <p>
      A timeline is composed of multiple TimeLineItem componenets nested inside a container Timeline component. Items
      may contain any children.
    </p>
    <Playground snippet={String(TimelineSnippet)} components={{ Timeline, TimelineItem }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription.TimelineItem} />
  </Card>
)
