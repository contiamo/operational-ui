import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const StackedRenderer = {
  type: "stacked",
  stackAxis: "x",
  renderAs: [{ type: "bars" }, { type: "text" }],
}

const createData = () => {
  return {
    series: [
      {
        data: [
          {
            data: [
              { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 14), y: undefined },
              { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) },
            ],
            xAttribute: "y",
            yAttribute: "x",
            name: "Users",
            key: "series1",
          },
          {
            data: [
              { x: new Date(2018, 2, 10), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 500) },
              { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 500) },
            ],
            xAttribute: "y",
            yAttribute: "x",
            name: "New Users",
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
      },
      x1: {
        type: "quant",
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

export const title: string = "Bars, horizontal stacked"

// Must match the file name so we can link to the code on GitHub
export const slug = "bars-4"
