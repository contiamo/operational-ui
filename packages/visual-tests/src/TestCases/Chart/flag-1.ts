import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const data: any = {
  series: [
    {
      data: [{ x: new Date(2018, 2, 12) }, { x: new Date(2018, 2, 15) }],
      name: "Pageviews 2018",
      axis: "x1",
      key: "series1",
      renderAs: [{ type: "flag" }]
    },
    {
      data: [{ y: 100 }, { y: 400 }],
      name: "Pageviews 2017",
      axis: "y1",
      key: "series2",
      renderAs: [{ type: "flag" }]
    },
    {
      data: [{ x: new Date(2017, 2, 13) }],
      name: "Pageviews 2017",
      axis: "x2",
      key: "series3",
      renderAs: [{ type: "flag" }]
    },
    {
      data: [{ y: 300 }],
      name: "Pageviews 2017",
      axis: "y2",
      key: "series4",
      renderAs: [{ type: "flag" }]
    }
  ],
  axes: {
    x1: {
      type: "time",
      start: new Date(2018, 2, 10),
      end: new Date(2018, 2, 17),
      interval: "day"
    },
    x2: {
      type: "time",
      start: new Date(2017, 2, 10),
      end: new Date(2017, 2, 17),
      interval: "day"
    },
    y1: {
      type: "quant",
      start: 0,
      end: 500
    },
    y2: {
      type: "quant",
      start: 0,
      end: 600
    }
  }
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Render", () => {
    viz.data(data)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Flags"

// Must match the file name so we can link to the code on GitHub
export const slug = "flag-1"
