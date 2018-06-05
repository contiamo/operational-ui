import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"
import { operational } from "@operational/theme"
import { OperationalUI } from "@operational/components"

const containerNode = document.getElementById("app")

import PieChart from "../../src/PieChart/facade"
import { VisualizationWrapper } from "../../src/index"

const colors: any = {
  Berlin: operational.colors.info,
  Dortmund: operational.colors.success,
  Bonn: operational.colors.warning,
  Cologne: operational.colors.error,
}

const accessors: any = {
  key: (d: any): string => d.id,
  value: (d: any): string => d.size,
  color: (d: any): string => colors[d.id],
}

const DonutRenderer: any = {
  accessors,
  type: "donut",
}

const GaugeRenderer: any = {
  accessors,
  type: "gauge",
  extent: "semi",
  comparison: { id: "Last month", size: 18 },
  target: 50,
}

const PolarRenderer: any = {
  accessors,
  type: "polar",
}

const data: any = {
  name: "Name",
  data: [{ id: "Berlin", size: 12 }, { id: "Dortmund", size: 5 }, { id: "Bonn", size: 7 }, { id: "Cologne", size: 11 }],
  renderAs: [DonutRenderer],
}

const config: any = { focusElement: "Berlin" }

const App = () => (
  <OperationalUI withBaseStyles>
    <VisualizationWrapper facade={PieChart} data={data} config={config} />
  </OperationalUI>
)

render(<App />, containerNode)

setTimeout(() => {
  data.data = [
    { id: "Berlin", size: 5 },
    { id: "Dortmund", size: 17 },
    { id: "Bonn", size: 27 },
    { id: "Cologne", size: 10 },
  ]
  render(<App />, containerNode)
}, 3000)
