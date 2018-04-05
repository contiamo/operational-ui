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
  // x: (series: any, d: any) => d.x.getDate() + "-" + d.x.getMonth() + 1
  // y: (series: any, d) => d.y
}

const AreaRenderer: any = {
  accessors: {
    ...AxesAccessors
  },
  type: "area"
}

const LineRenderer: any = {
  accessors: {
    ...AxesAccessors,
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

const data: any = {
  series: [
    {
      data: [
        {x: new Date("March 15, 2018"), y: 3000},
        {x: new Date("March 14, 2018"), y: 5000},
        {x: new Date("March 10, 2018"), y: 1000},
        {x: new Date("March 12, 2018"), y: undefined},
        {x: new Date("March 11, 2018"), y: 2000},
        {x: new Date("March 13, 2018"), y: 4000},
      ],
      name: "Line series with very, very, very, very long name",
      key: "unique_key",
      // xAxis: "x2",
      yAxis: "y2",
      renderAs: [FixedBarsRenderer, TextRenderer, LineRenderer, SymbolRenderer, AreaRenderer]
    },
    {
      data: [
        {
          data: [
            {x: new Date("March 11, 2018"), y: 100},
            {x: new Date("March 12, 2018"), y: 200},
            {x: new Date("March 13, 2018"), y: 300},
            {x: new Date("March 14, 2018"), y: 400},
            {x: new Date("March 15, 2018"), y: 500}
          ],
          name: "Stacked series 1 with long name",
          key: "series1"
        },
        {
          data: [
            {x: new Date("March 10, 2018"), y: 10},
            {x: new Date("March 11, 2018"), y: 20},
            {x: new Date("March 12, 2018"), y: 30},
            {x: new Date("March 13, 2018"), y: 40},
            {x: new Date("March 14, 2018"), y: 50}
          ],
          name: "Stacked series 2 with long name",
          key: "series2"
        }
      ],
      renderAs: [StackedRenderer]  // Similar concept for range renderer, but data.length === 2
    }
  ],
  // series: [
  //   {
  //     data: [
  //       {x: "E", y: 3000000},
  //       {x: "A", y: 1000000},
  //       {x: "c", y: 3000000},
  //       {x: "B", y: 2000000},
  //       {x: "D", y: 4000000}
  //     ],
  //     name: "Line series with very, very, very, very long name",
  //     key: "unique_key",
  //     yAxis: "y2",
  //     renderAs: [AreaRenderer]
  //   },
  //   {
  //     data: [
  //       {
  //         data: [
  //           {x: "A", y: 100},
  //           {x: 5, y: 200},
  //           {x: "C", y: 300},
  //           {x: "D", y: 400},
  //           {x: "E", y: 500}
  //         ],
  //         name: "Stacked series 1 with long name",
  //         key: "series1"
  //       },
  //       {
  //         data: [
  //           {x: "A", y: 10},
  //           {x: "B", y: 20},
  //           {x: "C", y: 30},
  //           {x: "D", y: 40},
  //           {x: "E", y: 50}
  //         ],
  //         name: "Stacked series 2 with long name",
  //         key: "series2"
  //       }
  //     ],
  //     renderAs: [StackedRenderer]  // Similar concept for range renderer, but data.length === 2
  //   }
  // ],
  axes: {
      x1: {
        type: "time",
        start: "2018-03-10",
        end: "2018-03-15",
        interval: "days"
      },
    // x1: {
    //   type: "time",
    //   start: "2018-02-26",
    //   end: "2018-03-26",
    //   interval: "days"
    // },
    // x2: {
    //   type: "time",
    //   start: "2016-02-26",
    //   end: "2016-03-26",
    //   interval: "days"
    // },
    // x1: {
    //   type: "categorical"
    // },
    y1: {
      type: "quant"
    },
    y2: {
      type: "quant"
    }
  }
}

const App = () => <OperationalUI><VisualizationWrapper facade={Chart} data={data}/></OperationalUI>

render(<App />, containerNode)
