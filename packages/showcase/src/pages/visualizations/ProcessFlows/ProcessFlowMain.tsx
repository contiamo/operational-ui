import * as React from "react"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import { Card, CardHeader } from "contiamo-ui-components"
import { ProcessFlow, VisualizationWrapper } from "contiamo-visualizations"

import * as simpleSnippet from "./snippets/ProcessFlow.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Process Flow</CardHeader>

    <p>
      Process flow visualizations are designed to show the paths taken through a set of process steps (represented by
      nodes).
    </p>

    <p>
      Processes are assumed to be linear, i.e. there should be a set order in which steps can be passed through. If, for
      instance, "Step A" sometimes comes before "Step B" and sometimes after, this is condsidered to be a loop. The
      visualization will throw an error if there are loops in the data. Loops can be removed from the data before it is
      passed to the visualization by passing it through the ProcessFlowLoopHandler component of the
      "contiamo-visualizations" package.
    </p>

    <h4>Usage</h4>
    <Playground snippet={String(simpleSnippet)} scope={{ ProcessFlow }} components={{ VisualizationWrapper }} />

    <h4>Data</h4>
    <p>
      The input data should be an object with properties 'journeys' and 'nodes' (alternative names can only be used if
      the data accessors are then set accordingly: see below).
    </p>

    <p>
      'data.journeys' is an array of objects, with each object representing a single journey. Each journey object should
      have the following properties
      <ul>
        <li>path - an array of node id strings</li>
        <li>size - the journey count</li>
      </ul>
    </p>

    <p>
      'data.nodes' is an array of node objects. All nodes referenced in a journey path must be included here. Every node
      object must have an 'id' property that corresponds to the ids used in the journey paths.
    </p>

    <h4>Accessors</h4>
    <p>
      Accessors are used to tell the visualization about data structure (data accessors), and to determine how
      individual nodes and individual links should be rendered (node and link accessors). Rendering options that must
      apply to all nodes and links are set via the config.
    </p>

    <h4>Data Accessors</h4>
    <p>
      Data accessors must be functions with single parameter 'data'. They are required if the nodes and journeys can not
      be accessed from the input data via the properties 'nodes' and 'journeys'.
    </p>
    <Table props={propDescription.DataAccessors} />

    <h4>Node Accessors</h4>
    <p>Node accessors must be functions with single parameter 'node'.</p>
    <Table props={propDescription.NodeAccessors} />

    <h4>Link Accessors</h4>
    <p>Link accessors must be functions with single parameter 'link'.</p>
    <Table props={propDescription.LinkAccessors} />

    <h4>Config</h4>
    <Table props={propDescription.Config} />
  </Card>
)
