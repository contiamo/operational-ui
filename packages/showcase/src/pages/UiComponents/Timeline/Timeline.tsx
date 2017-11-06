import * as React from "react"
import { Link } from "react-router-dom"

import Playground from "../../../components/Playground/Playground"
import { Card, CardHeader, Timeline, TimelineItem, Heading2Type } from "contiamo-ui-components"

import Table from "../../../components/PropsTable/PropsTable"
import * as TimelineSnippet from "./snippets/Timeline.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Timeline</CardHeader>

    <p>
      Display information vertically on a timeline from top to bottom. This is composed of multiple{" "}
      <a href="#timeline-item">TimelineItem</a>s.
    </p>
    <Heading2Type>Usage</Heading2Type>
    <Playground snippet={String(TimelineSnippet)} components={{ Timeline, TimelineItem }} />

    <div style={{ marginBottom: 32 }} />

    <CardHeader id="timeline-item">TimelineItem</CardHeader>
    <Heading2Type>Represents an individual node in the timeline.</Heading2Type>

    <Table props={propDescription.TimelineItem} />
  </Card>
)
