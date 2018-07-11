import { Chart, AxesData } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const LineRenderer = {
  accessors: {
    interpolate: () => "monotoneX",
  },
  type: "line",
}

const AreaRenderer = {
  accessors: {
    interpolate: () => "monotoneX",
  },
  type: "area",
}

const createData = (axes: AxesData) => {
  return {
    axes,
    series: [
      {
        key: "series1",
        data: [
          { x: new Date(2018, 2, 1), y: 100 },
          { x: new Date(2018, 2, 2), y: 200 },
          { x: new Date(2018, 2, 3), y: 175 },
          { x: new Date(2018, 2, 4), y: 260 },
          { x: new Date(2018, 2, 5), y: 100 },
          { x: new Date(2018, 2, 6), y: 200 },
          { x: new Date(2018, 2, 7), y: 175 },
          { x: new Date(2018, 2, 8), y: 260 },
          { x: new Date(2018, 2, 9), y: 100 },
          { x: new Date(2018, 2, 10), y: 200 },
          { x: new Date(2018, 2, 11), y: 175 },
          { x: new Date(2018, 2, 12), y: 260 },
          { x: new Date(2018, 2, 13), y: 220 },
          { x: new Date(2018, 2, 14), y: 220 },
          { x: new Date(2018, 2, 15), y: 220 },
        ],
        renderAs: [LineRenderer, AreaRenderer],
      },
    ],
  }
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)
  viz.config({ showComponentFocus: true })

  test("Automatic axis config", () => {
    viz.data(
      createData({
        x1: {
          type: "time",
          start: new Date(2018, 2, 1),
          end: new Date(2018, 2, 15),
          interval: "day",
          title: "2018",
        },
        y1: {
          type: "quant",
          title: "Unique users",
        },
      }),
    )
    viz.draw()
  })

  test("Update font sizes", () => {
    viz.data(
      createData({
        x1: {
          type: "time",
          start: new Date(2018, 2, 1),
          end: new Date(2018, 2, 15),
          interval: "day",
          fontSize: 25,
          title: "2018",
        },
        y1: {
          type: "quant",
          fontSize: 17,
          title: "Unique users",
        },
      }),
    )
    viz.draw()
  })

  test("Update margins", () => {
    viz.data(
      createData({
        x1: {
          type: "time",
          start: new Date(2018, 2, 1),
          end: new Date(2018, 2, 15),
          interval: "day",
          fontSize: 25,
          margin: 100,
          title: "2018",
        },
        y1: {
          type: "quant",
          fontSize: 17,
          margin: 100,
          title: "Unique users",
        },
      }),
    )
    viz.draw()
  })

  test("Update tick spacing", () => {
    viz.data(
      createData({
        x1: {
          type: "time",
          start: new Date(2018, 2, 1),
          end: new Date(2018, 2, 15),
          interval: "day",
          fontSize: 25,
          margin: 100,
          tickSpacing: 150,
          title: "2018",
        },
        y1: {
          type: "quant",
          fontSize: 17,
          margin: 100,
          title: "Unique users",
        },
      }),
    )
    viz.draw()
  })

  test("Reset config", () => {
    viz.data(
      createData({
        x1: {
          type: "time",
          start: new Date(2018, 2, 1),
          end: new Date(2018, 2, 15),
          interval: "day",
          title: "2018",
        },
        y1: {
          type: "quant",
          title: "Unique users",
        },
      }),
    )
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "General axis config"

// Must match the file name so we can link to the code on GitHub
export const slug = "axes-7"
