import { Chart, AxesData } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const BarRenderer = {
  type: "bars",
}

/** @todo @imogenf please improve the typings here. */
const axes: AxesData = {
  x1: {
    type: "categorical",
  },
  y1: {
    type: "quant",
  },
}

const data: any = {
  axes,
  series: [],
}

const data1: any = {
  axes,
  series: [
    {
      key: "series1",
      data: [{ x: "Berlin", y: null }, { x: "Dortmund", y: null }, { x: "Bonn", y: null }, { x: "Cologne", y: null }],
      renderAs: [BarRenderer],
    },
  ],
}

const data2 = {
  axes,
  series: [
    {
      key: "series1",
      data: [{ x: "Berlin", y: 0 }, { x: "Dortmund", y: 0 }, { x: "Bonn", y: 0 }, { x: "Cologne", y: 0 }],
      renderAs: [BarRenderer],
    },
  ],
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Renders the chart with an empty dataset", () => {
    viz.data(data)
    viz.draw()
  })

  test("Renders the chart with only missing data", () => {
    viz.data(data1)
    viz.draw()
  })

  test("Renders the chart with only 0 values", () => {
    viz.data(data2)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Empty/no data"

// Must match the file name so we can link to the code on GitHub
export const slug = "general-1"
