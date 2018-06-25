import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const LineRenderer = {
  type: "line",
}

const data: any = {
  series: [
    {
      data: [
        { x: new Date(2018, 2, 11), y: 100 },
        { x: new Date(2018, 2, 12), y: 300 },
        { x: new Date(2018, 2, 13), y: 500 },
        { x: new Date(2018, 2, 14), y: 300 },
        { x: new Date(2018, 2, 15), y: 200 },
      ],
      name: "Active users",
      key: "series1",
      renderAs: [LineRenderer],
    },
    {
      data: [
        { x: new Date(2018, 2, 10), y: 5000 },
        { x: new Date(2018, 2, 11), y: 4500 },
        { x: new Date(2018, 2, 12), y: 2500 },
        { x: new Date(2018, 2, 13), y: 4250 },
        { x: new Date(2018, 2, 14), y: 5700 },
      ],
      name: "Pageviews",
      yAxis: "y2",
      key: "series2",
      renderAs: [LineRenderer],
    },
  ],
  axes: {
    x1: {
      type: "time",
      start: new Date(2018, 2, 10),
      end: new Date(2018, 2, 15),
      interval: "day",
      title: "2018",
      rotateLabels: true,
    },
    y1: {
      type: "quant",
      title: "Active users",
    },
    y2: {
      type: "quant",
      title: "Pageviews",
    },
  },
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Render chart", () => {
    viz.data(data)
    viz.draw()
  })

  test("Resize", () => {
    viz.config({
      width: 600,
      height: 350,
    })
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Resizing"

// Must match the file name so we can link to the code on GitHub
export const slug = "general-3"
