import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const BarsRenderer = {
  type: "bars",
}

const data: any = {
  series: [
    {
      data: [
        { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 14), y: undefined },
        { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) },
      ],
      name: "Pageviews 2018",
      key: "series1",
      interpolate: "step",
      renderAs: [BarsRenderer],
    },
    {
      data: [
        { x: new Date(2018, 2, 10), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 500) },
      ],
      name: "Pageviews 2017",
      key: "series2",
      renderAs: [BarsRenderer],
    },
  ],
  axes: {
    x1: {
      type: "time",
      start: new Date(2018, 2, 10),
      end: new Date(2018, 2, 17),
      interval: "day",
    },
    y1: {
      type: "quant",
    },
  },
}

const data1: any = {
  series: [
    {
      data: [
        { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 14), y: undefined },
        { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) },
      ],
      xAttribute: "y",
      yAttribute: "x",
      name: "Pageviews 2018",
      key: "series1",
      interpolate: "step",
      renderAs: [BarsRenderer],
    },
    {
      data: [
        { x: new Date(2018, 2, 10), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 500) },
      ],
      xAttribute: "y",
      yAttribute: "x",
      name: "Pageviews 2017",
      key: "series2",
      renderAs: [BarsRenderer],
    },
  ],
  axes: {
    y1: {
      type: "time",
      start: new Date(2018, 2, 10),
      end: new Date(2018, 2, 17),
      interval: "day",
    },
    x1: {
      type: "quant",
    },
  },
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Automatic axes", () => {
    viz.data(data)
    viz.draw()
  })

  test("Defined axes", () => {
    viz.data(data1)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Switching axes"

// Must match the file name so we can link to the code on GitHub
export const slug = "axes-6"
