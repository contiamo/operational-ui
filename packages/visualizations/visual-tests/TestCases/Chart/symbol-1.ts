import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const createRenderer = (options: any) => {
  return {
    type: "symbol",
    accessors: {
      fill: options.fill || ((series: any, d: any) => "#fff"),
      size: options.size || ((series: any, d: any) => 50),
      stroke: options.stroke || ((series: any, d: any) => series.legendColor()),
      symbol: options.symbol || ((series: any, d: any) => "circle"),
      opacity: options.opacity || ((series: any, d: any) => 0.8),
    },
  }
}

const createData = (options: any) => {
  return {
    series: [
      {
        data: [
          { x: new Date(2018, 2, 10), y: 1 },
          { x: new Date(2018, 2, 11), y: 2 },
          { x: new Date(2018, 2, 12), y: 3 },
          { x: new Date(2018, 2, 13), y: 4 },
          { x: new Date(2018, 2, 14), y: 5 },
          { x: new Date(2018, 2, 15), y: 6 },
          { x: new Date(2018, 2, 16), y: 7 },
        ],
        name: "Pageviews",
        key: "series2",
        renderAs: [createRenderer(options)],
      },
    ],
    axes: {
      x1: {
        type: "time",
        start: new Date(2018, 2, 10),
        end: new Date(2018, 2, 16),
        interval: "day",
        title: "March 2018",
      },
      y1: {
        type: "quant",
        title: "Daily pageviews",
      },
    },
  }
}

const symbols: { [key: number]: string } = {
  1: "circle",
  2: "cross",
  3: "diamond",
  4: "square",
  5: "squareDiamond",
  6: "star",
  7: "triangle",
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Render", () => {
    viz.data(createData({}))
    viz.draw()
  })

  test("Change symbols", () => {
    viz.data(createData({ symbol: (series: any, d: any) => symbols[d.y] }))
    viz.draw()
  })

  test("Change sizes", () => {
    viz.data(
      createData({
        symbol: (series: any, d: any) => symbols[d.y],
        size: (series: any, d: any) => 25 * d.y,
      }),
    )
    viz.draw()
  })

  test("Change strokes", () => {
    viz.data(
      createData({
        symbol: (series: any, d: any) => symbols[d.y],
        size: (series: any, d: any) => 25 * d.y,
        stroke: (series: any, d: any) => (d.y % 2 === 0 ? series.legendColor() : "red"),
      }),
    )
    viz.draw()
  })

  test("Change fills", () => {
    viz.data(
      createData({
        symbol: (series: any, d: any) => symbols[d.y],
        size: (series: any, d: any) => 25 * d.y,
        stroke: (series: any, d: any) => (d.y % 2 === 0 ? series.legendColor() : "red"),
        fill: (series: any, d: any) => (d.y % 2 === 0 ? series.legendColor() : "red"),
      }),
    )
    viz.draw()
  })

  test("Change opacities", () => {
    viz.data(
      createData({
        symbol: (series: any, d: any) => symbols[d.y],
        size: (series: any, d: any) => 25 * d.y,
        stroke: (series: any, d: any) => (d.y % 2 === 0 ? series.legendColor() : "red"),
        fill: (series: any, d: any) => (d.y % 2 === 0 ? series.legendColor() : "red"),
        opacity: (series: any, d: any) => (d.y % 2 === 1 ? 0.4 : 0.6),
      }),
    )
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Symbols"

// Must match the file name so we can link to the code on GitHub
export const slug = "symbol-1"
