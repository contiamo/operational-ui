import * as React from "react"
import { VisualizationWrapper, Chart } from "@operational/visualizations"
import * as constants from "../../constants"
import { Subsection } from "../../components"

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

const XFlagRenderer = {
  type: "flag",
  config: {
    axis: "x1",
  },
}

const BarsRenderer: any = {
  type: "bars",
}

const StackedRenderer: any = {
  type: "stacked",
  renderAs: [BarsRenderer],
}

const RangeRenderer = {
  type: "range",
  renderAs: [AreaRenderer, LineRenderer],
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
    {
      data: [
        {
          x: new Date(2018, 2, 11),
          description: "Flags can be added to indicate the occurrence of an event, or to represent a target",
          direction: "up",
          label: "Flag 1",
        },
      ],
      hideInLegend: true,
      key: "series_flags_x",
      renderAs: [XFlagRenderer],
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

const data1 = {
  series: [
    {
      series: [
        {
          data: [
            { x: new Date(2018, 2, 11), y: 123 },
            { x: new Date(2018, 2, 12), y: 423 },
            { x: new Date(2018, 2, 13), y: 234 },
            { x: new Date(2018, 2, 14), y: 635 },
            { x: new Date(2018, 2, 15), y: 876 },
            { x: new Date(2018, 2, 16), y: 532 },
            { x: new Date(2018, 2, 17), y: 987 },
          ],
          name: "Group 1",
          key: "series1",
        },
        {
          data: [
            { x: new Date(2018, 2, 11), y: 154 },
            { x: new Date(2018, 2, 12), y: 98 },
            { x: new Date(2018, 2, 13), y: 337 },
            { x: new Date(2018, 2, 14), y: 282 },
            { x: new Date(2018, 2, 15), y: 371 },
            { x: new Date(2018, 2, 16), y: 129 },
            { x: new Date(2018, 2, 17), y: 456 },
          ],
          name: "Group 2",
          key: "series2",
        },
        {
          data: [
            { x: new Date(2018, 2, 11), y: 26 },
            { x: new Date(2018, 2, 12), y: 134 },
            { x: new Date(2018, 2, 13), y: 211 },
            { x: new Date(2018, 2, 14), y: 97 },
            { x: new Date(2018, 2, 15), y: 234 },
            { x: new Date(2018, 2, 16), y: 76 },
            { x: new Date(2018, 2, 17), y: 135 },
          ],
          name: "Group 3",
          key: "series3",
        },
      ],
      renderAs: [StackedRenderer],
    },
  ],
  axes: {
    x1: {
      type: "time",
      start: new Date(2018, 2, 11),
      end: new Date(2018, 2, 17),
      interval: "day",
    },
    y1: {
      type: "quant",
    },
  },
}

const data2: any = {
  series: [
    {
      series: [
        {
          data: [
            { x: new Date(2017, 0), y: 543 },
            { x: new Date(2017, 1), y: 632 },
            { x: new Date(2017, 2), y: 798 },
            { x: new Date(2017, 3), y: 732 },
            { x: new Date(2017, 4), y: 643 },
            { x: new Date(2017, 5), y: 664 },
            { x: new Date(2017, 6), y: 646 },
            { x: new Date(2017, 7), y: 567 },
            { x: new Date(2017, 8), y: 547 },
            { x: new Date(2017, 9), y: 562 },
            { x: new Date(2017, 10), y: 438 },
            { x: new Date(2017, 11), y: 456 },
          ],
          name: "Sales: team 1",
          key: "series01",
        },
        {
          data: [
            { x: new Date(2017, 0), y: 987 },
            { x: new Date(2017, 1), y: 854 },
            { x: new Date(2017, 2), y: 456 },
            { x: new Date(2017, 3), y: 325 },
            { x: new Date(2017, 4), y: 376 },
            { x: new Date(2017, 5), y: 398 },
            { x: new Date(2017, 6), y: 478 },
            { x: new Date(2017, 7), y: 559 },
            { x: new Date(2017, 8), y: 734 },
            { x: new Date(2017, 9), y: 621 },
            { x: new Date(2017, 10), y: 435 },
            { x: new Date(2017, 11), y: 321 },
          ],
          name: "Sales: team 2",
          key: "series02",
        },
      ],
      renderAs: [RangeRenderer],
    },
  ],
  axes: {
    x1: {
      type: "time",
      start: new Date(2017, 0),
      end: new Date(2017, 11),
      interval: "month",
    },
    y1: {
      type: "quant",
    },
  },
}

const between = (min: number, max: number) => Math.random() * (max - min + 1) + min

const generators = {
  China: () => {
    const country = "China"
    const size = Math.floor(between(0.8, 1.5) * 1e6)
    const sales = size * between(0.01, 0.015)
    const profit = sales * between(0.1, 0.2)
    const store = Math.random() > 0.1 ? "MegaStore" : "Store"
    return { country, size, sales, profit, store }
  },
  Germany: () => {
    const country = "Germany"
    const size = Math.floor(between(0.2, 1) * 1e6)
    const sales = size * between(0.05, 0.3)
    const profit = sales * between(0.3, 0.5)
    const store = Math.random() > 0.3 ? "MegaStore" : "Store"
    return { country, size, sales, profit, store }
  },
  Netherlands: () => {
    const country = "Netherlands"
    const size = Math.floor(between(0.5, 0.8) * 1e6)
    const sales = size * between(0.1, 0.4)
    const profit = sales * between(0.4, 0.55)
    const store = Math.random() > 0.3 ? "MegaStore" : "Store"
    return { country, size, sales, profit, store }
  },
}

type Country = keyof typeof generators

const dataPoint = (country: Country) => {
  return generators[country]()
}

const generateData = (country: Country, amount = 100) => {
  return Array(amount)
    .fill(0)
    .map(i => dataPoint(country))
}

const renderer = {
  type: "symbol",
  accessors: {
    fill: (series: any, d: any) => series.legendColor(),
    focusContent: (series: any, d: any) => [
      { name: "Country", value: d.country },
      { name: "Profit", value: d.profit },
      { name: "Sales", value: d.sales },
      { name: "Size", value: d.size },
      { name: "Store", value: d.store },
    ],
    size: (series: any, d: any) => {
      const range = [5, 60]
      const domain = [0, 1.5 * 1e6]
      return range[0] + ((range[1] - range[0]) * (d.size - domain[0])) / (domain[1] - domain[0])
    },
    stroke: () => "transparent",
    symbol: (series: any, d: any) => (d.store === "MegaStore" ? "cross" : "diamond"),
    opacity: (series: any, d: any) => 0.4,
  },
}

const data3 = {
  series: [
    {
      data: generateData("China", 50),
      name: "China",
      key: "china",
      xAttribute: "profit",
      yAttribute: "sales",
      renderAs: [renderer],
    },
    {
      data: generateData("Germany", 50),
      name: "Germany",
      key: "germany",
      xAttribute: "profit",
      yAttribute: "sales",
      renderAs: [renderer],
    },
    {
      data: generateData("Netherlands", 50),
      name: "Netherlands",
      key: "netherlands",
      xAttribute: "profit",
      yAttribute: "sales",
      renderAs: [renderer],
    },
  ],
  axes: {
    x1: {
      type: "quant",
    },
    y1: {
      type: "quant",
    },
  },
}

export const Component = () => (
  <React.Fragment>
    <Subsection>
      <VisualizationWrapper facade={Chart} data={data} config={config} />
    </Subsection>
    <Subsection>
      <VisualizationWrapper facade={Chart} data={data1} config={config} />
    </Subsection>
    <Subsection>
      <VisualizationWrapper facade={Chart} data={data2} config={config} />
    </Subsection>
    <Subsection>
      <VisualizationWrapper facade={Chart} data={data3} config={config} />
    </Subsection>
  </React.Fragment>
)
