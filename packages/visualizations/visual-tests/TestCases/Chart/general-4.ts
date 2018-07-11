import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"
import { format } from "d3-format"

const LineRenderer = {
  type: "line",
}

const data: any = {
  series: [
    {
      data: [
        { x: new Date(2018, 2, 11), y: Math.random() * 1000000 },
        { x: new Date(2018, 2, 12), y: Math.random() * 1000000 },
        { x: new Date(2018, 2, 13), y: Math.random() * 1000000 },
        { x: new Date(2018, 2, 14), y: Math.random() * 1000000 },
        { x: new Date(2018, 2, 15), y: Math.random() * 1000000 },
      ],
      name: "Active users",
      key: "series1",
      renderAs: [LineRenderer],
    },
    {
      data: [
        { x: new Date(2018, 2, 10), y: Math.random() * 500000 },
        { x: new Date(2018, 2, 11), y: Math.random() * 500000 },
        { x: new Date(2018, 2, 12), y: Math.random() * 500000 },
        { x: new Date(2018, 2, 13), y: Math.random() * 500000 },
        { x: new Date(2018, 2, 14), y: Math.random() * 500000 },
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
    viz.config({ numberFormatter: format("~e") })
    viz.data(data)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Number format - SI"

// Must match the file name so we can link to the code on GitHub
export const slug = "general-4"
