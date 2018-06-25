import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const LineRenderer = {
  type: "line",
  accessors: {
    interpolate: () => "monotoneX",
    closeGaps: () => true,
  },
}

const AreaRenderer = {
  type: "area",
  accessors: {
    interpolate: () => "monotoneX",
    closeGaps: () => true,
  },
}

const SymbolRenderer = {
  type: "symbol",
  accessors: {
    size: (series: any, d: any) => 10,
  },
}

const RangeRenderer = {
  type: "range",
  renderAs: [AreaRenderer, LineRenderer, SymbolRenderer],
}

const createData = () => {
  return {
    series: [
      {
        series: [
          {
            data: [
              { x: new Date(2018, 2, 10), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 200 - 100) },
            ],
            name: "New Users",
            key: "series1",
          },
          {
            data: [
              { x: new Date(2018, 2, 10), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 200 - 100) },
            ],
            name: "Existing Users",
            key: "series2",
          },
        ],
        renderAs: [RangeRenderer],
      },
    ],
    axes: {
      x1: {
        type: "time",
        start: new Date(2018, 2, 10),
        end: new Date(2018, 2, 17),
        interval: "day",
        title: "March 2018",
      },
      y1: {
        type: "quant",
        title: "Total users",
      },
    },
  }
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Render", () => {
    viz.data(createData())
    viz.draw()
  })

  test("Update", () => {
    viz.data(createData())
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Range"

// Must match the file name so we can link to the code on GitHub
export const slug = "range-1"
