import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const createSingleSeries = (renderers: any[]) => {
  return {
    series: [
      {
        data: [
          { x: new Date(2018, 2, 10), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 500) - 250 },
        ],
        name: "Pageviews: homepage",
        key: "series1",
        renderAs: renderers,
      },
    ],
    axes: {
      x1: {
        type: "time",
        start: new Date(2018, 2, 10),
        end: new Date(2018, 2, 17),
        interval: "day",
        title: "2018",
      },
      y1: {
        type: "quant",
      },
    },
  }
}

const createData = (renderers: any[]) => {
  return {
    series: [
      {
        data: [
          { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 14), y: undefined },
          { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) - 250 },
        ],
        name: "Pageviews: homepage",
        key: "series1",
        interpolate: "step",
        renderAs: renderers,
      },
      {
        data: [
          { x: new Date(2018, 2, 10), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 500) - 250 },
        ],
        name: "Pageviews: explore view",
        key: "series2",
        renderAs: renderers,
      },
    ],
    axes: {
      x1: {
        type: "time",
        start: new Date(2018, 2, 10),
        end: new Date(2018, 2, 17),
        interval: "day",
        title: "2018",
        rotateLabels: true,
      },
      y1: {
        type: "quant",
        title: "Total pageviews",
        rotateLabels: true,
      },
    },
  }
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Render", () => {
    viz.data(createSingleSeries([{ type: "bars" }, { type: "text" }]))
    viz.draw()
  })

  test("Add series", () => {
    viz.data(createData([{ type: "bars" }, { type: "text" }]))
    viz.draw()
  })

  test("Update and remove text labels", () => {
    viz.data(createData([{ type: "bars" }]))
    viz.draw()
  })

  test("Increase tick padding", () => {
    viz.config({ outerBarSpacing: 20 })
    viz.draw()
  })

  test("Assign widths", () => {
    const barWidth = (series: any, d: any) => (series.key() === "series1" ? 20 : 10)
    viz.data(createData([{ type: "bars", accessors: { barWidth } }]))
    viz.draw()
  })

  test("Color accessors", () => {
    const barWidth = (series: any, d: any) => (series.key() === "series1" ? 20 : 10)
    const color = (series: any, d: any) => (d.y > 400 ? "red" : series.legendColor())
    viz.data(createData([{ type: "bars", accessors: { color, barWidth } }]))
    viz.draw()
  })

  test("Opacity", () => {
    const barWidth = (series: any, d: any) => (series.key() === "series1" ? 20 : 10)
    const color = (series: any, d: any) => (d.y > 400 ? "red" : series.legendColor())
    const opacity = (series: any, d: any) => 0.4
    viz.data(createData([{ type: "bars", accessors: { color, barWidth, opacity } }]))
    viz.draw()
  })

  test("Remove some bars", () => {
    const barWidth = (series: any, d: any) => (series.key() === "series1" ? 20 : 10)
    const color = (series: any, d: any) => (d.y > 400 ? "red" : series.legendColor())
    const opacity = (series: any, d: any) => 0.4
    const data: any = {
      series: [
        {
          data: [
            { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) - 250 },
            { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) - 250 },
            { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) - 250 },
            { x: new Date(2018, 2, 14), y: undefined },
            { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) - 250 },
          ],
          name: "Pageviews 2018",
          key: "series1",
          interpolate: "step",
          renderAs: [{ type: "bars", accessors: { color, barWidth, opacity } }],
        },
        {
          data: [
            { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) - 250 },
            { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) - 250 },
            { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) - 250 },
            { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) - 250 },
          ],
          name: "Pageviews 2017",
          key: "series2",
          renderAs: [{ type: "bars", accessors: { color, barWidth, opacity } }],
        },
      ],
      axes: {
        x1: {
          type: "time",
          start: new Date(2018, 2, 11),
          end: new Date(2018, 2, 15),
          interval: "day",
        },
        y1: {
          type: "quant",
        },
      },
    }
    viz.data(data)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Bars"

// Must match the file name so we can link to the code on GitHub
export const slug = "bars-1"
