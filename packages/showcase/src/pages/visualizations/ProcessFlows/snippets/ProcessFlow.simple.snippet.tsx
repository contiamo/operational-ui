import * as React from "react"
import { ProcessFlow, VisualizationWrapper } from "contiamo-visualizations"

export default (function() {
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
            } else if (node.group === "end") {
              return "lightcoral"
            } else {
              return "#fff"
            }
          },
          shape: (node: any) => {
            if (node.group === "start") {
              return "square"
            } else if (node.group === "end") {
              return "circle"
            } else {
              return "squareDiamond"
            }
          },
          stroke: (node: any) => {
            return node.group ? "none" : "#000"
          }
        },
        link: {
          stroke: (link: any) => {
            if (link.source.attributes.group === "start") {
              return "lightgreen"
            } else if (link.target.attributes.group === "end") {
              return "lightcoral"
            } else {
              return "#bbb"
            }
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
