import { Chart } from "@operational/visualizations"
import { IMarathon } from "../../components/Marathon"

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
        { x: new Date(2017, 2, 10), y: 500 },
        { x: new Date(2017, 2, 11), y: 450 },
        { x: new Date(2017, 2, 12), y: 250 },
        { x: new Date(2017, 2, 13), y: 425 },
        { x: new Date(2017, 2, 14), y: 570 }
      ],
      name: "Pageviews 2017",
      xAxis: "x2",
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
    x2: {
      type: "time",
      start: new Date(2017, 2, 10),
      end: new Date(2017, 2, 15),
      interval: "day"
    },
    y1: {
      type: "quant"
    }
  }
}

export const marathon = ({ test, afterAll, container }: IMarathon): void => {
  const viz = new Chart(container)

  test("Same number of ticks", () => {
    viz.data(data)
    viz.draw()
  })

  test("Different number of ticks", () => {
    data.axes.x1 = {
      type: "time",
      start: new Date(2018, 2, 8),
      end: new Date(2018, 2, 17),
      interval: "day"
    }
    viz.data(data)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Multiple x axes"
