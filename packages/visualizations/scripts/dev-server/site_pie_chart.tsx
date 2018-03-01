import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"
import { operational } from "@operational/theme"
import { OperationalUI } from "@operational/components"

injectStylesheet(baseStylesheet(operational))

const containerNode = document.getElementById("app")

import PieChart from "../../src/PieChart/facade"
import { VisualizationWrapper } from "../../src/index"

const colors: any = {
  "Berlin": operational.colors.info,
  "Dortmund": operational.colors.success,
  "Bonn": operational.colors.warning,
  "Cologne": operational.colors.error,
}

const accessors: any = {
  key: (d: any): string => d.id,
  value: (d: any): string => d.size,
  color: (d: any): string => colors[d.id],
}

const DonutRenderer: any = {
  type: "donut",
  accessors
}

const GaugeRenderer: any = {
  type: "gauge",
  extent: "semi",
  comparison: { id: "Last month", size: 18 },
  target: 50,
  accessors
}

const PolarRenderer: any = {
  type: "polar",
  accessors
}

const data: any = {
  name: "Name",
  data: [
    { id: "Berlin", size: 12 },
    { id: "Dortmund", size: 5 },
    { id: "Bonn", size: 7 },
    { id: "Cologne", size: 11 },
    { id: "", size: 50 },
    { id: undefined, size: 70 },
    { id: "test", size: 0 },
    { id: "test2", size: undefined }
  ],
  renderAs: [DonutRenderer]
}

const config: any = { focusElement: "Berlin" }

const App = () => <OperationalUI><VisualizationWrapper facade={PieChart} data={data} config={config} /></OperationalUI>

render(<App />, containerNode)