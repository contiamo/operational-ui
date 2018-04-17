import { Chart } from "@operational/visualizations"
import { IMarathon } from "../../components/Marathon"

const BarsRenderer = {
  type: "bars"
}

const data: any = {
  series: [
    {
      data: [
        { x: new Date(2018, 2, 11), y: 100 },
        { x: new Date(2018, 2, 12), y: 300 },
        { x: new Date(2018, 2, 13), y: 500 },
        { x: new Date(2018, 2, 14), y: undefined },
        { x: new Date(2018, 2, 15), y: 200 }
      ],
      name: "Pageviews 2018",
      key: "series1",
      interpolate: "step",
      renderAs: [BarsRenderer]
    },
    {
      data: [
        { x: new Date(2018, 2, 10), y: 500 },
        { x: new Date(2018, 2, 11), y: 450 },
        { x: new Date(2018, 2, 12), y: 250 },
        { x: new Date(2018, 2, 13), y: 425 },
        { x: new Date(2018, 2, 14), y: 570 },
        { x: new Date(2018, 2, 16), y: 234 },
        { x: new Date(2018, 2, 17), y: 123 }
      ],
      name: "Pageviews 2017",
      key: "series2",
      renderAs: [BarsRenderer]
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

const data1: any = {
  series: [
    {
      data: [
        { x: new Date(2018, 2, 11), y: 200 },
        { x: new Date(2018, 2, 12), y: 175 },
        { x: new Date(2018, 2, 13), y: 430 },
        { x: new Date(2018, 2, 14), y: 190 },
        { x: new Date(2018, 2, 15), y: 230 }
      ],
      name: "Pageviews 2018",
      key: "series1",
      interpolate: "step",
      renderAs: [BarsRenderer]
    },
    {
      data: [
        { x: new Date(2018, 2, 11), y: 350 },
        { x: new Date(2018, 2, 12), y: 350 },
        { x: new Date(2018, 2, 13), y: 325 },
        { x: new Date(2018, 2, 14), y: 470 },
        { x: new Date(2018, 2, 16), y: 334 },
        { x: new Date(2018, 2, 17), y: 223 }
      ],
      name: "Pageviews 2017",
      key: "series2",
      renderAs: [BarsRenderer]
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

export const marathon = ({ test, afterAll, container }: IMarathon): void => {
  const viz = new Chart(container)

  test("Render", () => {
    viz.data(data)
    viz.draw()
  })

  test("Update", () => {
    viz.data(data1)
    viz.draw()
  })

  test("Assign widths", () => {
    data1.series[0].renderAs[0].accessors = { barWidth: () => 10 }
    data1.series[1].renderAs[0].accessors = { barWidth: () => 15 }
    viz.data(data1)
    viz.draw()
  })

  test("Color accessors", () => {
    const color = (series: any, d: any) => d.y > 400 ? "red" : series.legendColor()
    data1.series[0].renderAs[0].accessors = { color, barWidth: () => 10 }
    data1.series[1].renderAs[0].accessors = { color, barWidth: () => 15 }
    viz.data(data1)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Bars"
