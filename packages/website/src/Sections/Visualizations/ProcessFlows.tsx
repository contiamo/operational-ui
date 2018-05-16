import * as React from "react"
import { VisualizationWrapper, ProcessFlow } from "@operational/visualizations"
import * as constants from "../../constants"

export const title = "Process Flow"

export const docsUrl = `${constants.docsBaseUrl}/visualizations/process-flow.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Visualizations/ProcessFlows.tsx`

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
  width: 660,
  height: 330,
  maxNodeSize: 200,
  nodeBorderWidth: 4,
}

const processFlowAccessors = {
  node: {
    color: (node: any) => {
      if (node.group === "start") {
        return "#f2dd41"
      }
      if (node.group === "end") {
        return "#2b99d5"
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
    label: (node: any) => {
      return `Node ${node.id}`
    },
  },
  link: {
    stroke: (link: any) => {
      if (link.source.attributes.group === "start") {
        return "#f2dd41"
      }
      if (link.target.attributes.group === "end") {
        return "#2b99d5"
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
