import * as React from "react"
import { Link } from "react-router-dom"

import Playground from "../../components/Playground/Playground"
import { CardHeader, Timeline, TimelineItem } from "contiamo-ui-components"

import Table from "../../components/PropsTable/PropsTable"
import * as TimelineSnippet from "./snippets/Timeline.snippet"
import propDescription from "./propDescription"

export default () => (
  <div>
    <CardHeader>Timeline</CardHeader>

    <p>
      Display information vertically on a timeline from top to bottom. This is composed of multiple{" "}
      <a href="#timeline-item">TimelineItem</a>s.
    </p>
    <h4>Usage</h4>
    <Playground snippet={String(TimelineSnippet)} components={{ Timeline, TimelineItem }} />

    <div style={{ marginBottom: 32 }} />

    <CardHeader id="timeline-item">TimelineItem</CardHeader>
    <h4>Represents an individual node in the timeline.</h4>

    <Table props={propDescription.TimelineItem} />
  </div>
)
