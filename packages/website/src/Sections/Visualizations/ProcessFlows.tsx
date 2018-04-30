import * as React from "react"
import { VisualizationWrapper, PieChart, Sunburst, ProcessFlow } from "@operational/visualizations"
import { Div } from "glamorous"

export const title = "Process Flow"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/visualizations/process-flow.md"

const processFlowData = {
  journeys: [
    { path: ["1", "3", "4", "5"], size: 1500 },
    { path: ["1", "3", "6"], size: 700 },
    { path: ["2", "3", "4", "6"], size: 1200 },
    { path: ["2", "6"], size: 300 },
  ],
  nodes: [
    { id: "1", group: "start" },
    { id: "2", group: "start" },
    { id: "3" },
    { id: "4" },
    { id: "5", group: "end" },
    { id: "6", group: "end" },
  ],
}

const processFlowConfig = {
  width: 240,
  height: 240,
  maxNodeSize: 200,
  nodeBorderWidth: 4,
}

const processFlowAccessors = {
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
    },
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
    },
  },
}

export const Component = () => (
  <React.Fragment>
    <VisualizationWrapper
      facade={ProcessFlow}
      data={processFlowData}
      config={processFlowConfig}
      accessors={processFlowAccessors}
    />
  </React.Fragment>
)
