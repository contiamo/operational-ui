import { Chart } from "@operational/visualizations"
import { IMarathon } from "../../components/Marathon"

const createSingleSeries = (renderers: any[]) => {
  return {
    series: [
      {
        data: [
          { x: new Date(2018, 2, 10), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 500) }
        ],
        name: "Pageviews 2017",
        key: "series2",
        renderAs: renderers
      }
    ],
    axes: {
      x1: {
        type: "time",
        start: new Date(2018, 2, 10),
        end: new Date(2018, 2, 17),
        interval: "day"
      },
      y1: {
        type: "quant"
      }
    }
  }
}

const createData = (renderers: any[]) => {
  return {
    series: [
      {
        data: [
          { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 14), y: undefined },
          { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) }
        ],
        name: "Pageviews 2018",
        key: "series1",
        interpolate: "step",
        renderAs: renderers
      },
      {
        data: [
          { x: new Date(2018, 2, 10), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 500) }
        ],
        name: "Pageviews 2017",
        key: "series2",
        renderAs: renderers
      }
    ],
    axes: {
      x1: {
        type: "time",
        start: new Date(2018, 2, 10),
        end: new Date(2018, 2, 17),
        interval: "day"
      },
      y1: {
        type: "quant"
      }
    }
  }
}

export const marathon = ({ test, afterAll, container }: IMarathon): void => {
  const viz = new Chart(container)

  test("Render", () => {
    viz.data(createSingleSeries([{ type: "bars" }, { type: "text" }]))
    viz.draw()
  })

  test("Add series", () => {
    viz.data(createData([{ type: "bars" }, { type: "text" }]))
    viz.draw()
  })

  test("Update", () => {
    viz.data(createData([{ type: "bars" }, { type: "text" }]))
    viz.draw()
  })

  test("Increase tick padding", () => {
    viz.config({ outerBarPadding: 20 })
    viz.draw()
  })

  test("Assign widths", () => {
    const barWidth = (series: any, d: any) => series.key() === "series1" ? 20 : 10
    viz.data(createData([{ type: "bars", accessors: { barWidth } }]))
    viz.draw()
  })

  test("Color accessors", () => {
    const barWidth = (series: any, d: any) => series.key() === "series1" ? 20 : 10
    const color = (series: any, d: any) => d.y > 400 ? "red" : series.legendColor()
    viz.data(createData([{ type: "bars", accessors: { color, barWidth } }]))
    viz.draw()
  })

  test("Remove some bars", () => {
    const barWidth = (series: any, d: any) => series.key() === "series1" ? 20 : 10
    const color = (series: any, d: any) => d.y > 400 ? "red" : series.legendColor()
    const data = {
      series: [
        {
          data: [
            { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
            { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
            { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
            { x: new Date(2018, 2, 14), y: undefined },
            { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) }
          ],
          name: "Pageviews 2018",
          key: "series1",
          interpolate: "step",
          renderAs: [{ type: "bars", accessors: { color, barWidth } }]
        },
        {
          data: [
            { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
            { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
            { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
            { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) },
          ],
          name: "Pageviews 2017",
          key: "series2",
          renderAs: [{ type: "bars", accessors: { color, barWidth } }]
        }
      ],
      axes: {
        x1: {
          type: "time",
          start: new Date(2018, 2, 11),
          end: new Date(2018, 2, 15),
          interval: "day"
        },
        y1: {
          type: "quant"
        }
      }
    }
    viz.data(data)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Bars"
