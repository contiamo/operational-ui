import * as React from "react"
import { render } from "react-dom"
import { forEach } from "lodash/fp"
import { injectStylesheet, baseStylesheet } from "@operational/utils"
import { operational } from "@operational/theme"

injectStylesheet(baseStylesheet(operational))

const containerNode = document.getElementById("app")

import PieChart from "../../src/PieChart/facade"

const colors: any = {
  "Berlin": operational.colors.info,
  "Dortmund": operational.colors.success,
  "Bonn": operational.colors.warning,
  "Cologne": operational.colors.error,
}

const accessors: any = {
  key: (d: any): string => d.key,
  value: (d: any): string => d.value,
  color: (d: any): string => colors[d.key],
}
const DonutRenderer: any = {
  type: "donut",
  ...accessors
}

const GaugeRenderer: any = {
  type: "gauge",
  extent: "semi",
  comparison: { key: "Last month", value: 18 },
  target: 50,
  ...accessors
}

const data: any = {
  name: "Name",
  data: [
    { key: "Berlin", value: 12 },
    { key: "Dortmund", value: 5 },
    { key: "Bonn", value: 7 },
    { key: "Cologne", value: 11 },
    { key: "", value: 50 },
    { key: undefined, value: 70 },
    { key: "test", value: 0 },
    { key: "test2", value: undefined }
  ],
  renderAs: [GaugeRenderer]
}

const viz: PieChart = new PieChart(containerNode)
viz.data(data)
viz.draw()
