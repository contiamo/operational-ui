import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"
import { operational } from "@operational/theme"
import { OperationalUI } from "@operational/components"

injectStylesheet(baseStylesheet(operational))

const containerNode = document.getElementById("app")
const containerNode2 = document.getElementById("app2")

import Chart from "../../src/Chart/facade"
import { VisualizationWrapper } from "../../src/index"

const AreaRenderer: any = {
  accessors: {
    interpolate: (series: any, d: any) => "monotoneX"
  },
  type: "area"
}

const LineRenderer: any = {
  accessors: {
    interpolate: (series: any, d: any) => "monotoneX",
  },
  type: "line"
}

const BarsRenderer: any = {
  type: "bars"
}

const FixedBarsRenderer: any = {
  accessors: {
    barWidth: () => 20
  },
  type: "bars"
}

const SymbolRenderer: any = {
  accessors: {
    symbol: (series: any, d: any) => d.y >= 1000 ? "cross" : "diamond",
    size: (series: any, d: any) => series.key() === "series2" ? 150 : 60,
    fill: () => "#bbb"
  },
  type: "symbol"
}

const TextRenderer: any = {
  type: "text",
  config: {
    offset: 5,
  }
}

const StackedRenderer = {
  type: "stacked",
  stackAxis: "y",
  renderAs: [BarsRenderer, TextRenderer]
}

const FlagRenderer = {
  type: "flag"
}

const RangeRenderer = {
  type: "range",
  stackAxis: "y",
  renderAs: [AreaRenderer, LineRenderer, SymbolRenderer]
}

const data: any = {
  series: [
    {
      data: [
        { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) }
      ],
      name: "Pageviews 2018",
      key: "series1",
      renderAs: [LineRenderer, TextRenderer],
    },
  ],
  axes: {
    x1: {
      type: "time",
      start: new Date(2018, 2, 11),
      end: new Date(2018, 2, 15),
      interval: "day",
      margin: 30
    },
    y1: {
      type: "quant",
      unit: "EUR",
      margin: 50,
      // showRules: false
    }
  }
}

const data1: any = {
  series: [
    {
      data: [
        { x: new Date(2018, 2, 9), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 10), y: Math.floor(Math.random() * 500) },        
        { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 500) }
      ],
      name: "Pageviews 2018",
      key: "series1",
      renderAs: [LineRenderer, TextRenderer],
    },
  ],
  axes: {
    x1: {
      type: "time",
      start: new Date(2018, 2, 9),
      end: new Date(2018, 2, 17),
      interval: "day",
      margin: 30
    },
    y1: {
      type: "quant",
      unit: "EUR",
      margin: 50,
      // showRules: false
    }
  }
}

const App = () => <OperationalUI><VisualizationWrapper facade={Chart} data={data} config={{uid: "TEST"}}/></OperationalUI>
const App2 = () => <OperationalUI><VisualizationWrapper facade={Chart} data={data1}/></OperationalUI>
render(<App />, containerNode)
render(<App2 />, containerNode2)
