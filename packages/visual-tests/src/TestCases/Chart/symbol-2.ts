import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const SymbolRenderer = {
  type: "symbol",
}

const createData = () => {
  return {
    series: [
      {
        data: [
          { x: new Date(2018, 2, 10), y: Math.floor(Math.random() * 100) },
          { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 100) },
          { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 100) },
          { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 100) },
          { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 100) },
          { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 100) },
          { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 100) },
        ],
        name: "Pageviews",
        datumAccessors: {
          x: (d: any) => d.y,
          y: (d: any) => d.x,
        },
        key: "series2",
        renderAs: [SymbolRenderer],
      },
    ],
    axes: {
      y1: {
        type: "time",
        start: new Date(2018, 2, 10),
        end: new Date(2018, 2, 16),
        interval: "day",
        title: "2018",
      },
      x1: {
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

  test("Update data", () => {
    viz.data(createData())
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Symbols, horizontal"

// Must match the file name so we can link to the code on GitHub
export const slug = "symbol-2"
