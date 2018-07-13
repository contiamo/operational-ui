import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const LineRenderer = {
  type: "line",
  accessors: {
    interpolate: () => "monotoneY",
  },
}

const AreaRenderer = {
  type: "area",
  accessors: {
    interpolate: () => "monotoneY",
  },
}

const SymbolRenderer = {
  type: "symbol",
  accessors: {
    size: (seris: any, d: any) => 10,
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
              { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 200 - 100) },
              { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 200 - 100) },
            ],
            datumAccessors: {
              x: (d: any) => d.y,
              y: (d: any) => d.x,
            },
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
            datumAccessors: {
              x: (d: any) => d.y,
              y: (d: any) => d.x,
            },
            name: "Existing Users",
            key: "series2",
          },
        ],
        renderAs: [RangeRenderer],
      },
    ],
    axes: {
      y1: {
        type: "time",
        start: new Date(2018, 2, 10),
        end: new Date(2018, 2, 17),
        interval: "day",
        title: "2018",
      },
      x1: {
        type: "quant",
        rotateLabels: true,
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

export const title: string = "Range, horizontal"

// Must match the file name so we can link to the code on GitHub
export const slug = "range-2"
