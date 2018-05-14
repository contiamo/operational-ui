import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"
import { operational } from "@operational/theme"
import { OperationalUI } from "@operational/components"

injectStylesheet(baseStylesheet(operational))

const containerNode = document.getElementById("app")

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
    interpolate: (series: any, d: any) => "monotoneY",
    dashed: (series: any, d: any) => series.key() === "unique_key",
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
  type: "text"
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
      interpolate: "step",
      renderAs: [BarsRenderer],
      hide: false
    },
    {
      data: [
        // { x: new Date(2018, 2, 10), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) },
        // { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 500) }
      ],
      name: "Pageviews 2017",
      key: "series2",
      renderAs: [BarsRenderer]
    }
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
      margin: 50
    }
  }
}

const data1: any = {
  series: [
    {
      data: [
        { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 14), y: undefined },
        { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) }
      ],
      xAttribute: "y",
      yAttribute: "x",
      name: "Pageviews 2018",
      key: "series1",
      interpolate: "step",
      renderAs: [BarsRenderer],
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
      xAttribute: "y",
      yAttribute: "x",
      name: "Pageviews 2017",
      key: "series2",
      renderAs: [BarsRenderer]
    }
  ],
  axes: {
    y1: {
      type: "time",
      start: new Date(2018, 2, 10),
      end: new Date(2018, 2, 17),
      interval: "day"
    },
    x1: {
      type: "quant"
    }
  }
}

const App = () => <OperationalUI><VisualizationWrapper facade={Chart} data={data} config={{outerBarPadding: 35}}/></OperationalUI>

render(<App />, containerNode)

// setTimeout(() => {
//   data = data1
//   render(<App />, containerNode)
// }, 3000)
