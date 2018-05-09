import * as React from "react"
import { VisualizationWrapper, PieChart } from "@operational/visualizations"
import { Div } from "glamorous"

export const title = "Gauges"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/visualizations/pie-chart.md"

const config = {
  width: 330,
  height: 330,
  palette: [
    "#f2dd41",
    "#2b99d5",
    "#f59b44",
    "#417cba",
    "#d56456",
    "#4d619c",
    "#9b405d",
    "#4f467c",
    "#572b51",
    "#4a2d5b",
  ],
}

const pieData = {
  data: [{ key: "New Users", value: 1450 }, { key: "Existing Users", value: 2300 }],
  renderAs: [{ type: "gauge", extent: "semi", target: 5000 }],
}

export const Component = () => (
  <React.Fragment>
    <VisualizationWrapper facade={PieChart} data={pieData} config={config} />
  </React.Fragment>
)
