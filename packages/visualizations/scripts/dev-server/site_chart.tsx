import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"
import { operational } from "@operational/theme"
import { OperationalUI } from "@operational/components"

injectStylesheet(baseStylesheet(operational))

const containerNode = document.getElementById("app")

import Chart from "../../src/Chart/facade"
import { VisualizationWrapper } from "../../src/index"

const AxesAccessors: any = {
  x: (series: any, d: any) => d.x,
  y: (series: any, d: any) => d.y
}

const AreaRenderer: any = {
  accessors: {
    ...AxesAccessors,
    interpolate: (series: any, d: any) => "monotoneY"
  },
  type: "area"
}

const LineRenderer: any = {
  accessors: {
    ...AxesAccessors,
    interpolate: (series: any, d: any) => "monotoneY",
    dashed: (series: any, d: any) => series.key() === "unique_key",
  },
  type: "line"
}

const BarsRenderer: any = {
  accessors: {
    ...AxesAccessors
  },
  type: "bars"
}

const FixedBarsRenderer: any = {
  accessors: {
    ...AxesAccessors,
    barWidth: () => 20
  },
  type: "bars"
}

const SymbolRenderer: any = {
  accessors: {
    ...AxesAccessors,
    symbol: (series: any, d: any) => d.y >= 1000 ? "cross" : "diamond",
    size: (series: any, d: any) => series.key() === "series2" ? 150 : 60,
    fill: () => "#bbb"
  },
  type: "symbol"
}

const TextRenderer: any = {
  accessors: {
    ...AxesAccessors
  },
  type: "text"
}

const StackedRenderer = {
  accessors: {
    ...AxesAccessors
  },
  type: "stacked",
  stackAxis: "y",
  renderAs: [BarsRenderer, TextRenderer]
}

const FlagRenderer = {
  type: "flag"
}

const RangeRenderer = {
  accessors: {
    ...AxesAccessors
  },
  type: "range",
  stackAxis: "y",
  renderAs: [AreaRenderer, LineRenderer, SymbolRenderer]
}

let data: any = {
  series: [
    {
      data: [
        { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 14), y: undefined },
        { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) }
      ],
      name: "Pageviews 2018",
      key: "series1",
      interpolate: "step",
      renderAs: [BarsRenderer]
    },
    {
      data: [
        { x: new Date(2018, 2, 10), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 500) }
      ],
      name: "Pageviews 2017",
      key: "series2",
      renderAs: [BarsRenderer]
    }
  ],
  axes: {
    x1: {
      type: "time",
      start: new Date(2018, 2, 10),
      end: new Date(2018, 2, 17),
      interval: "day"
    },
    y1: {
      type: "quant"
    }
  }
}

const App = () => <OperationalUI><VisualizationWrapper facade={Chart} data={data} /></OperationalUI>

render(<App />, containerNode)

setTimeout(() => {
  data.series[0].renderAs[0].accessors = { ...AxesAccessors, barWidth: () => 20 }
  data.series[0].renderAs[0].accessors = { ...AxesAccessors, barWidth: () => 10 }
  render(<App />, containerNode)
}, 3000)
