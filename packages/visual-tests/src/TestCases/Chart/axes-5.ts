import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const LineRenderer = {
  type: "line"
}

const data: any = {
  series: [
    {
      data: [
        { x: new Date(2018, 2, 11), y: 100 },
        { x: new Date(2018, 2, 12), y: 300 },
        { x: new Date(2018, 2, 13), y: 500 },
        { x: new Date(2018, 2, 14), y: 300 },
        { x: new Date(2018, 2, 15), y: 200 }
      ],
      name: "Pageviews 2018",
      key: "series1",
      renderAs: [LineRenderer]
    },
    {
      data: [
        { x: new Date(2018, 2, 10), y: 500 },
        { x: new Date(2018, 2, 11), y: 450 },
        { x: new Date(2018, 2, 12), y: 250 },
        { x: new Date(2018, 2, 13), y: 425 },
        { x: new Date(2018, 2, 14), y: 570 }
      ],
      name: "Pageviews 2017",
      yAxis: "y2",
      key: "series2",
      renderAs: [LineRenderer]
    }
  ],
  axes: {
    x1: {
      type: "time",
      start: new Date(2018, 2, 10),
      end: new Date(2018, 2, 15),
      interval: "day"
    },
    y1: {
      type: "quant"
    },
    y2: {
      type: "quant"
    }
  }
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Automatic axes", () => {
    viz.data(data)
    viz.draw()
  })

  test("Defined axes", () => {
    data.axes.y1 = {
      type: "quant",
      end: 700
    }
    data.axes.y2 = {
      type: "quant",
      end: 650
    }
    viz.data(data)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Multiple y axes"

// Must match the file name so we can link to the code on GitHub
export const slug = "axes-5"
