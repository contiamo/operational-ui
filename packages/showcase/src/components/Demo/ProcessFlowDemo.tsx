import * as React from "react"
import { ProcessFlow, VisualizationWrapper } from "@operational/visualizations"

interface IProps {
  step: number
}

interface IState {}

class ProcessFlowDemo extends React.Component<IProps, IState> {
  render() {
    const data1 = {
      journeys: [{ path: ["1", "3", "4"], size: 1500 }, { path: ["2", "3", "4"], size: 1200 }],
      nodes: [{ id: "1", group: "start" }, { id: "2", group: "start" }, { id: "3" }, { id: "4", group: "end" }]
    }
    const data2 = {
      journeys: [
        { path: ["1", "3", "4"], size: 1500 },
        { path: ["2", "3", "4"], size: 800 },
        { path: ["2", "3", "5"], size: 1600 },
        { path: ["1", "3", "5"], size: 800 }
      ],
      nodes: [
        { id: "1", group: "start" },
        { id: "2", group: "start" },
        { id: "3" },
        { id: "4", group: "end" },
        { id: "5", group: "end" }
      ]
    }
    const data3 = {
      journeys: [
        { path: ["1", "3", "4"], size: 1500 },
        { path: ["2", "3", "4"], size: 800 },
        { path: ["2", "3", "5"], size: 1600 },
        { path: ["2", "3", "6"], size: 1600 },
        { path: ["1", "3", "5"], size: 800 }
      ],
      nodes: [
        { id: "1", group: "start" },
        { id: "2", group: "start" },
        { id: "3" },
        { id: "6" },
        { id: "4", group: "end" },
        { id: "5", group: "end" }
      ]
    }
    return (
      <VisualizationWrapper
        facade={ProcessFlow}
        data={this.props.step === 0 ? data1 : this.props.step === 1 ? data2 : data3}
        accessors={{
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
        }}
        config={{
          maxNodeSize: 800,
          nodeBorderWidth: 4
        }}
      />
    )
  }
}

export default ProcessFlowDemo
