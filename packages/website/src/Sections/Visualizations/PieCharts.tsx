import * as React from "react"
import { VisualizationWrapper, PieChart, Sunburst, ProcessFlow } from "@operational/visualizations"
import { Div } from "glamorous"
import * as constants from "../../constants"

export const title = "Pie Charts"

export const docsUrl = `${constants.docsBaseUrl}/visualizations/pie-chart.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Visualizations/PieCharts.tsx`

const config = {
  width: 240,
  height: 240,
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
