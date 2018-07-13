import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const AreaRenderer = {
  type: "area",
}

const LineRenderer = {
  type: "line",
}

const PointsRenderer = {
  type: "symbol",
  accessors: {
    size: (series: any, d: any) => 20,
  },
}

const createData = () => {
  return {
    series: [
      {
        data: [{ x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) - 250 }],
        name: "Profit 2018",
        key: "series1",
        interpolate: "step",
        renderAs: [AreaRenderer, LineRenderer, PointsRenderer],
      },
    ],
    axes: {
      x1: {
        type: "time",
        start: new Date(2018, 2, 10),
        end: new Date(2018, 2, 12),
        interval: "day",
        title: "2018",
      },
      y1: {
        type: "quant",
        title: "Pageviews",
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

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Area/line - single point"

// Must match the file name so we can link to the code on GitHub
export const slug = "area-5"
