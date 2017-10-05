import * as React from "react"
import * as ContiamoVisualizations from "contiamo-visualizations"
import { Card, CardHeader } from "contiamo-ui-components"
import * as data from "./data/index"

// @TODO Fix this!
// import { ProcessFlow, VisualizationWrapper } from "contiamo-visualizations"
const Viz = (ContiamoVisualizations as any)["contiamo-visualizations"]
const ProcessFlow: any = Viz.ProcessFlow
const VisualizationWrapper: any = Viz.VisualizationWrapper

interface IProps {
  match: {
    params: {
      case: string
    }
  }
}

const config = {
  arrowFill: "none"
}

const accessors = {
  node: {
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
    // size: (node: any) => (node.group === "start" ? 50 : 20),
    stroke: (node: any) => {
      if (node.group) {
        return "none"
      }
    }
  },
  link: {
    stroke: (link: any) => {
      if (link.source.attributes.group === "start") {
        return "lightgreen"
      } else if (link.target.attributes.group === "end") {
        return "lightcoral"
      }
    }
  }
}

const ProcessFlowContainer: React.SFC<IProps> = props => {
  const case_: string = props.match.params.case
  return (
    <Card>
      <CardHeader>Process Flow Visualization</CardHeader>
      <VisualizationWrapper facade={ProcessFlow} data={(data as any)[case_]} accessors={accessors} config={config} />
    </Card>
  )
}

export default ProcessFlowContainer
