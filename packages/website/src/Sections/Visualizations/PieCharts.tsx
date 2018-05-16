import * as React from "react"
import { VisualizationWrapper, PieChart } from "@operational/visualizations"
import * as constants from "../../constants"

export const title = "Pie Charts"

export const docsUrl = `${constants.docsBaseUrl}/visualizations/pie-chart.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Visualizations/PieCharts.tsx`

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
  name: "Metric",
  data: [
    { key: "Berlin", value: 12 },
    { key: "Dortmund", value: 5 },
    { key: "Bonn", value: 7 },
    { key: "Cologne", value: 11 },
  ],
  renderAs: [{ type: "donut" }],
}

export const Component = () => (
  <React.Fragment>
    <VisualizationWrapper facade={PieChart} data={pieData} config={config} />
  </React.Fragment>
)
