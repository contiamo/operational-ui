import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const PointsRenderer = {
  type: "symbol",
  accessors: {
    size: (series: any, d: any) => 20,
  },
}

const createData = (closeGaps: boolean) => {
  const AreaRenderer = {
    accessors: {
      closeGaps: () => closeGaps,
    },
    type: "area",
  }

  const LineRenderer = {
    accessors: {
      closeGaps: () => closeGaps,
    },
    type: "line",
  }

  const StackedRenderer = {
    type: "stacked",
    stackAxis: "x",
    renderAs: [AreaRenderer, LineRenderer, PointsRenderer],
  }

  return {
    series: [
      {
        series: [
          {
            data: [
              { x: new Date(2018, 2, 10), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 11), y: 0 },
              { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
              // { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
              // { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 500) },
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
              { x: new Date(2018, 2, 10), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 500) },
            ],
            datumAccessors: {
              x: (d: any) => d.y,
              y: (d: any) => d.x,
            },
            name: "Existing Users",
            key: "series2",
          },
        ],
        renderAs: [StackedRenderer],
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
        title: "Users",
      },
    },
  }
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Render", () => {
    viz.data(createData(false))
    viz.draw()
  })

  test("Close gaps", () => {
    viz.data(createData(true))
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Area/line, horizontal stacked"

// Must match the file name so we can link to the code on GitHub
export const slug = "area-4"
