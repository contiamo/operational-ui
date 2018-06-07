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
import { timeFormat } from "d3-time-format"

const AreaRenderer: any = {
  accessors: {
    interpolate: (series: any, d: any) => "monotoneX",
  },
  type: "area",
}

const LineRenderer: any = {
  accessors: {
    interpolate: (series: any, d: any) => "monotoneX",
  },
  type: "line",
}

const BarsRenderer: any = {
  type: "bars",
}

const FixedBarsRenderer: any = {
  accessors: {
    barWidth: () => 20,
  },
  type: "bars",
}

const SymbolRenderer: any = {
  accessors: {
    symbol: (series: any, d: any) => (d.y >= 1000 ? "cross" : "diamond"),
    size: (series: any, d: any) => (series.key() === "series2" ? 150 : 60),
    fill: () => "#bbb",
  },
  type: "symbol",
}

const TextRenderer: any = {
  type: "text",
  config: {
    offset: 5,
  },
}

const StackedRenderer = {
  type: "stacked",
  renderAs: [BarsRenderer, TextRenderer],
}

const X1FlagRenderer = {
  type: "flag",
  config: {
    axis: "x1",
  },
}

const X2FlagRenderer = {
  type: "flag",
  config: {
    axis: "x2",
  },
}

const Y1FlagRenderer = {
  type: "flag",
  config: {
    axis: "y1",
  },
}

const Y2FlagRenderer = {
  type: "flag",
  config: {
    axis: "y2",
  },
}

const RangeRenderer = {
  type: "range",
  renderAs: [AreaRenderer, LineRenderer, SymbolRenderer],
}

const createData: any = () => {
  return {
    series: [
      {
        data: [
          { x: "March 10th", y: Math.floor(Math.random() * 500) - 250 },
          { x: "March 11th", y: Math.floor(Math.random() * 500) - 250 },
          { x: "March 12th", y: Math.floor(Math.random() * 500) - 250 },
          { x: "March 13th", y: Math.floor(Math.random() * 500) - 250 },
          { x: "March 14th", y: Math.floor(Math.random() * 500) - 250 },
          { x: "March 15th", y: Math.floor(Math.random() * 500) - 250 },
          { x: "March 16th", y: Math.floor(Math.random() * 500) - 250 },
          { x: "March 17th", y: Math.floor(Math.random() * 500) - 250 },
        ],
        name: "Pageviews 2018",
        key: "series1",
        renderAs: [TextRenderer, BarsRenderer],
      },
      {
        data: [
          { x: "March 10th", y: Math.floor(Math.random() * 300) - 150 },
          { x: "March 11th", y: Math.floor(Math.random() * 300) - 150 },
          { x: "March 12th", y: Math.floor(Math.random() * 300) - 150 },
          { x: "March 13th", y: Math.floor(Math.random() * 300) - 150 },
          { x: "March 14th", y: Math.floor(Math.random() * 300) - 150 },
          { x: "March 15th", y: Math.floor(Math.random() * 300) - 150 },
          { x: "March 16th", y: Math.floor(Math.random() * 300) - 150 },
          { x: "March 17th", y: Math.floor(Math.random() * 300) - 150 },
        ],
        name: "Users 2018",
        key: "series2",
        renderAs: [TextRenderer, BarsRenderer],
      },
      {
        series: [
          {
            data: [
              { y: "March 10th", x: Math.floor(Math.random() * 200 + 1000) },
              { y: "March 11th", x: Math.floor(Math.random() * 200 + 1000) },
              { y: "March 13th", x: Math.floor(Math.random() * 200 + 1000) },
              { y: "March 14th", x: Math.floor(Math.random() * 200 + 1000) },
              { y: "March 15th", x: Math.floor(Math.random() * 200 + 1000) },
              { y: "March 16th", x: Math.floor(Math.random() * 200 + 1000) },
              { y: "March 17th", x: Math.floor(Math.random() * 200 + 1000) },
            ],
            name: "Metric 1",
            key: "series3",
            xAttribute: "y",
            yAttribute: "x",
            yAxis: "y2",
          },
          {
            data: [
              { y: "March 10th", x: Math.floor(Math.random() * 200 + 1000) },
              { y: "March 11th", x: Math.floor(Math.random() * 200 + 1000) },
              { y: "March 12th", x: Math.floor(Math.random() * 200 + 1000) },
              { y: "March 13th", x: Math.floor(Math.random() * 200 + 1000) },
              { y: "March 14th", x: Math.floor(Math.random() * 200 + 1000) },
              { y: "March 15th", x: Math.floor(Math.random() * 200 + 1000) },
              { y: "March 16th", x: Math.floor(Math.random() * 200 + 1000) },
              { y: "March 17th", x: Math.floor(Math.random() * 200 + 1000) },
            ],
            name: "Metric 2",
            key: "series4",
            xAttribute: "y",
            yAttribute: "x",
            yAxis: "y2",
          },
        ],
        renderAs: [StackedRenderer],
      },
      {
        data: [
          {
            y: 400,
            label: "Event 3",
            description:
              "Insert very long, long, long description here to see how the labels wrap when the description is very long.",
          },
        ],
        name: "Event flags",
        key: "flagsY1",
        hideInLegend: true,
        renderAs: [Y1FlagRenderer],
      },
      {
        data: [
          {
            y: 2000,
            label: "Event 4",
            description:
              "Insert very long, long, long description here to see how the labels wrap when the description is very long.",
          },
        ],
        name: "Event flags",
        key: "flagsY2",
        hideInLegend: true,
        renderAs: [Y2FlagRenderer],
      },
    ],
    axes: {
      x1: {
        type: "categorical",
      },
      y1: {
        type: "quant",
      },
      y2: {
        type: "quant",
      },
    },
  }
}

const data = createData()
const App = () => (
  <OperationalUI>
    <VisualizationWrapper
      facade={Chart}
      data={createData()}
      config={{ uid: "TEST", width: 700, showComponentFocus: true, maxFocusLabelWidth: 200 }}
    />
  </OperationalUI>
)
render(<App />, containerNode)

// setTimeout(() => {
//   // data = createData()
//   render(<App />, containerNode)
// }, 3000);
