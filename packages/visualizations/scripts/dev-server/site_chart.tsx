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

const XFlagRenderer = {
  type: "flag",
  config: {
    axis: "x1",
    axisPadding: 30
  }
}

const YFlagRenderer = {
  type: "flag",
  accessors: {
    color: (series, d) => d.y > 250 ? "red" : "purple"
  },
  config: {
    axis: "y1"
  }
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
    {
      data: [
        { x: new Date(2018, 2, 12), description: "Event flag 1", direction: "up", label: "Flag 1" },
        { x: new Date(2018, 2, 14), description: "Event flag 2", direction: "down", label: "Flag 2" }
      ],
      hideInLegend: true,
      key: "series_flags_x"
      renderAs: [XFlagRenderer]
    },
    {
      data: [
        { y: 300, description: "Event flag 4", direction: "up", label: "Flag 4" },
        { y: 200, description: "Event flag 3", direction: "down", label: "Flag 3" },
      ],
      hideInLegend: true,
      key: "series_flags_y"
      renderAs: [YFlagRenderer]
    },
  ],
  axes: {
    x1: {
      type: "time",
      start: new Date(2018, 2, 11),
      end: new Date(2018, 2, 15),
      interval: "day",
    },
    y1: {
      type: "quant",
      unit: "EUR",
      showRules: false
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
    },
    y1: {
      type: "quant",
      unit: "EUR",
    }
  }
}

const App = () => <OperationalUI><VisualizationWrapper facade={Chart} data={data} config={{uid: "TEST"}}/></OperationalUI>
const App2 = () => <OperationalUI><VisualizationWrapper facade={Chart} data={data1}/></OperationalUI>
render(<App />, containerNode)
render(<App2 />, containerNode2)

setTimeout(() => {
  data.series[2].data[0].y = 450
  data.series[2].data[1].y = 120
  render(<App />, containerNode)
}, 3000);