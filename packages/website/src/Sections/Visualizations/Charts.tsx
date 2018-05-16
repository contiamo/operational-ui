import * as React from "react"
import { VisualizationWrapper, Chart } from "@operational/visualizations"
import * as constants from "../../constants"

export const title = "Charts"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/visualizations/chart.md"

export const snippetUrl = `${constants.snippetBaseUrl}/Visualizations/Charts.tsx`

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

const TextRenderer: any = {
  type: "text",
  config: {
    offset: 5,
  },
}

const data = {
  series: [
    {
      data: [
        { x: new Date(2018, 2, 9), y: 478 },
        { x: new Date(2018, 2, 10), y: 523 },
        { x: new Date(2018, 2, 11), y: 235 },
        { x: new Date(2018, 2, 12), y: 349 },
        { x: new Date(2018, 2, 13), y: 411 },
        { x: new Date(2018, 2, 14), y: 402 },
        { x: new Date(2018, 2, 15), y: 312 },
        { x: new Date(2018, 2, 16), y: 337 },
        { x: new Date(2018, 2, 17), y: 276 },
      ],
      name: "Revenue",
      key: "series1",
      renderAs: [LineRenderer, AreaRenderer, TextRenderer],
    },
  ],
  axes: {
    x1: {
      type: "time",
      start: new Date(2018, 2, 9),
      end: new Date(2018, 2, 17),
      interval: "day",
      margin: 30,
    },
    y1: {
      type: "quant",
      unit: "EUR",
      // showRules: false
    },
  },
}
export const Component = () => (
  <React.Fragment>
    <VisualizationWrapper facade={Chart} data={data} config={config} />
  </React.Fragment>
)
