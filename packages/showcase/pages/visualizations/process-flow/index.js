import * as React from "react"
import Link from "next/link"
import { Card, CardHeader, Heading2Type } from "@operational/components"
import { ProcessFlow, VisualizationWrapper } from "@operational/visualizations"

import Layout from "../../../components/Layout"
import Table from "../../../components/PropsTable"
import Playground from "../../../components/Playground"

const simpleSnippet = `
(() => {
  class Flow extends React.Component {
    state = {
      config: {
        maxNodeSize: 800,
        nodeBorderWidth: 4
      },
      data: {
        journeys: [{ path: ["1", "3", "4"], size: 1500 }, { path: ["2", "3", "4"], size: 1200 }],
        nodes: [{ id: "1", group: "start" }, { id: "2", group: "start" }, { id: "3" }, { id: "4", group: "end" }]
      },
      accessors: {
        node: {
          color: (node: any) => {
            if (node.group === "start") {
              return "lightgreen"
            }
            if (node.group === "end") {
              return "lightcoral"
            }
            return "#fff"
          },
          shape: (node: any) => {
            if (node.group === "start") {
              return "square"
            }
            if (node.group === "end") {
              return "circle"
            }
            return "squareDiamond"
          },
          stroke: (node: any) => {
            return node.group ? "none" : "#000"
          }
        },
        link: {
          stroke: (link: any) => {
            if (link.source.attributes.group === "start") {
              return "lightgreen"
            }
            if (link.target.attributes.group === "end") {
              return "lightcoral"
            }
            return "#bbb"
          }
        }
      }
    }

    render() {
      return (
        <VisualizationWrapper
          facade={ProcessFlow}
          data={this.state.data}
          accessors={this.state.accessors}
          config={this.state.config}
        />
      )
    }
  }

  return (
    <div>
      <Flow />
    </div>
  )
})()
`

const propDescription = {
  Config: [
    {
      name: "borderColor",
      description:
        "Color of border surrounding nodes and links. Should be the same color as the visualization background.",
      defaultValue: "#fff",
      type: "string",
      optional: true
    },
    {
      name: "duration",
      description: "Speed at which transitions are animated",
      defaultValue: "1e3",
      type: "number",
      optional: true
    },
    {
      name: "focusElement",
      description:
        'Node or link to be manually focussed. Object with properties "type" ("node" or "link") and "matchers" (desired values of node/link properties)',
      defaultValue: "{}",
      type: "object",
      optional: true
    },
    {
      name: "height",
      description: "Visualization height",
      defaultValue: "Infinity",
      type: "number",
      optional: true
    },
    {
      name: "hidden",
      description: "Hide/show the visualization div",
      defaultValue: "false",
      type: "boolean",
      optional: true
    },
    {
      name: "highlightColor",
      description: "Color with with nodes/links are highlighted on hover",
      defaultValue: "#1499CE",
      type: "string",
      optional: true
    },
    {
      name: "horizontalNodeSpacing",
      description: "Horizontal distance between nodes, if width is set to Infinity",
      defaultValue: "100",
      type: "number",
      optional: true
    },
    {
      name: "labelOffset",
      description: "Distance between nodes/links and corresponding text/focus labels",
      defaultValue: "2",
      type: "number",
      optional: true
    },
    {
      name: "linkBorderWidth",
      description: "Width of border on either side of links (to facilitate hovering)",
      defaultValue: "4",
      type: "number",
      optional: true
    },
    {
      name: "maxLinkWidth",
      description: "Width of largest links",
      defaultValue: "8",
      type: "number",
      optional: true
    },
    {
      name: "maxNodeSize",
      description: "Size of largest nodes in square pixels",
      defaultValue: "1500",
      type: "number",
      optional: true
    },
    {
      name: "minLinkWidth",
      description: "Width of smallest links",
      defaultValue: "1",
      type: "number",
      optional: true
    },
    {
      name: "minNodeSize",
      description: "Size of smallest nodes in square pixels",
      defaultValue: "100",
      type: "number",
      optional: true
    },
    {
      name: "nodeBorderWidth",
      description: "Width of border around nodes",
      defaultValue: "10",
      type: "number",
      optional: true
    },
    {
      name: "showLinkFocusLabels",
      description: "Enable/disable focus labels on link hover",
      defaultValue: "true",
      type: "boolean",
      optional: true
    },
    {
      name: "showNodeFocusLabels",
      description: "Enable/disable focus labels on node hover",
      defaultValue: "true",
      type: "boolean",
      optional: true
    },
    {
      name: "uid",
      description:
        "Unique identifier for the visualization, normally generated automatically from the visualization name",
      defaultValue: "",
      type: "string",
      optional: true
    },
    {
      name: "verticalNodeSpacing",
      description: "Vertical distance between nodes, if height is set to Infinity",
      defaultValue: "100",
      type: "number",
      optional: true
    },
    {
      name: "visualizationName",
      description: "Name of visualization",
      defaultValue: "processflow",
      type: "string",
      optional: true
    },
    {
      name: "width",
      description: "Visualization width",
      defaultValue: "Infinity",
      type: "number",
      optional: true
    }
  ],
  DataAccessors: [
    {
      name: "nodes",
      description: "Provides the attribute name for accessing nodes in the input data",
      defaultValue: "d => d.nodes",
      type: "string",
      optional: true
    },
    {
      name: "journeys",
      description: "Provides the attribute name for accessing journeys in the input data",
      defaultValue: "d => d.journeys",
      type: "string",
      optional: true
    }
  ],
  NodeAccessors: [
    {
      name: "color",
      description: "Node fill color",
      defaultValue: 'd => d.color || "#fff"',
      type: "string",
      optional: true
    },

    {
      name: "shape",
      description: "Node shape",
      defaultValue: 'd => d.shape || "squareDiamond"',
      type: "string",
      optional: true
    },

    {
      name: "size",
      description: "Value for determining node size",
      defaultValue: "d => d.size || 1",
      type: "number",
      optional: true
    },

    {
      name: "stroke",
      description: "Color of node border",
      defaultValue: 'd => d.stroke || "#000"',
      type: "string",
      optional: true
    },

    {
      name: "id",
      description: "Unique ID - defaults to a new unique string.",
      defaultValue: 'd => d.id || uniqueId("node")',
      type: "string",
      optional: true
    },

    {
      name: "label",
      description: "Label to display next to node/on focus labels",
      defaultValue: 'd => d.label || d.id || ""',
      type: "string",
      optional: true
    },

    {
      name: "labelPosition",
      description: "Node label position",
      defaultValue: 'd => d.labelPosition || "right"',
      type: "string",
      optional: true
    }
  ],
  LinkAccessors: [
    {
      name: "dash",
      description: 'Dash length of link. "<dashLength> <gapLength>". 0 is solid line',
      defaultValue: 'd => d.dash || "0"',
      type: "string",
      optional: true
    },
    {
      name: "label",
      description: "Label to display next to link.",
      defaultValue: 'd => d.label || d.source.label() + " → " + d.target.label() || ""',
      type: "string",
      optional: true
    },
    {
      name: "size",
      description: "Value for determining width of link",
      defaultValue: "d => d.size || 1",
      type: "number",
      optional: true
    },
    {
      name: "stroke",
      description: "Color of link",
      defaultValue: 'd => d.stroke || "#bbb"',
      type: "string",
      optional: true
    },
    {
      name: "source",
      description: "Node at which the link starts",
      defaultValue: "d => d.source || undefined",
      type: "node",
      optional: true
    },
    {
      name: "sourceId",
      description: "ID of node at which the link starts",
      defaultValue: "d => d.sourceId || undefined",
      type: "string",
      optional: true
    },
    {
      name: "target",
      description: "Node at which the link ends",
      defaultValue: "d => d.target || undefined",
      type: "node",
      optional: true
    },
    {
      name: "targetId",
      description: "ID of node at which the link ends",
      defaultValue: "d => d.targetId || undefined",
      type: "string",
      optional: true
    }
  ]
}

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        Process flow visualizations are designed to show the paths taken through a set of process steps (represented by
        nodes).
      </p>

      <p>
        Processes are assumed to be linear, i.e. there should be a set order in which steps can be passed through. If,
        for instance, "Step A" sometimes comes before "Step B" and sometimes after, this is condsidered to be a loop.
        The visualization will throw an error if there are loops in the data. Loops can be removed from the data before
        it is passed to the visualization by passing it through the ProcessFlowLoopHandler component of the
        "@operational/visualizations" package.
      </p>

      <Heading2Type>Usage</Heading2Type>
      <p>Here is a simple usage scenario for the process flow</p>
      <Playground snippet={simpleSnippet} scope={{ ProcessFlow }} components={{ VisualizationWrapper }} />

      <p>
        For more complicated use-cases, check out our collection of{" "}
        <Link href="/visualizations/process-flow/testcases">
          <a>visual test cases</a>
        </Link>.
      </p>

      <Heading2Type>Data</Heading2Type>
      <p>
        The input data should be an object with properties 'journeys' and 'nodes' (alternative names can only be used if
        the data accessors are then set accordingly: see below).
      </p>

      <p>
        'data.journeys' is an array of objects, with each object representing a single journey. Each journey object
        should have the following properties:
      </p>
      <ul>
        <li>path - an array of node id strings</li>
        <li>size - the journey count</li>
      </ul>

      <p>
        'data.nodes' is an array of node objects. All nodes referenced in a journey path must be included here. Every
        node object must have an 'id' property that corresponds to the ids used in the journey paths.
      </p>

      <Heading2Type>Accessors</Heading2Type>
      <p>
        Accessors are used to tell the visualization about data structure (data accessors), and to determine how
        individual nodes and individual links should be rendered (node and link accessors). Rendering options that must
        apply to all nodes and links are set via the config.
      </p>

      <p>
        Accessors can take 2 forms: a function with single parameter 'd', or a constant value, which is transformed
        within the visualization into function which returns the given constant. Custom accessors must be exhaustive: if
        the returned values are dependent on some condition(s), all possible outcomes of the condition(s) must be
        explicitly dealt with.
      </p>

      <Heading2Type>Data Accessors</Heading2Type>
      <p>
        Data accessors are required if the nodes and journeys can not be accessed from the input data via the properties
        'nodes' and 'journeys'.
      </p>
      <Table props={propDescription.DataAccessors} />

      <Heading2Type>Node Accessors</Heading2Type>
      <Table props={propDescription.NodeAccessors} />

      <Heading2Type>Link Accessors</Heading2Type>
      <Table props={propDescription.LinkAccessors} />

      <Heading2Type>Config</Heading2Type>
      <Table props={propDescription.Config} />
    </Card>
  </Layout>
)
