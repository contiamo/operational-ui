import * as React from "react"
import { ProcessFlow, VisualizationWrapper } from "@operational/visualizations"

class ProcessFlowDemo extends React.Component {
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

export default ProcessFlowDemo
