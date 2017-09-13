import * as React from "react"
import { Component } from "react"
import { ProcessFlow } from "contiamo-visualizations"
import { CardHeader } from "contiamo-ui-components"

const data = {
  journeys: [
    { path: ["1", "2", "3", "4"], size: 1500 },
    { path: ["1", "2", "3", "5", "4"], size: 1200 },
    { path: ["1", "7", "5", "8"], size: 700 },
    { path: ["9", "2", "3", "8"], size: 600 },
    { path: ["1", "2", "5", "6", "10"], size: 230 },
    { path: ["1", "2", "3", "6", "11"], size: 130 },
    { path: ["1", "2", "3", "4", "10"], size: 290 },
    { path: ["1", "2", "3", "12", "10"], size: 120 },
    { path: ["1", "2", "3", "4", "13"], size: 620 },
  ],
  nodes: [
    { id: "1", group: "start" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8", group: "end" },
    { id: "9", group: "start" },
    { id: "10", group: "end" },
    { id: "11", group: "end" },
    { id: "12" },
    { id: "13", group: "end" },
  ],
  nodeAccessors: {
    color: (node: any) => {
      if (node.group === "start") {
        return "lightgreen"
      } else if (node.group === "end") {
        return "lightcoral"
      }
    },
    label: (node: any) => "Node " + node.id,
    labelPosition: (node: any) => "top",
    shape: (node: any) => (node.group === "start" ? "square" : node.group === "end" ? "circle" : "diamond"),
    size: (node: any) => (node.group === "start" ? 50 : 20),
    stroke: (node: any) => {
      if (node.group) {
        return "none"
      }
    },
  },
  linkAccessors: {
    stroke: (link: any) => {
      if (link.source.attributes.group === "start") {
        return "lightgreen"
      } else if (link.target.attributes.group === "end") {
        return "lightcoral"
      }
    },
  },
}

export default () =>
  <div>
    <CardHeader>Process Flow Visualization</CardHeader>
    <ProcessFlow data={data} />
  </div>
