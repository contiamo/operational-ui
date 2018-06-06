import { PieChart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const DonutRenderer = {
  type: "donut",
}

/** @todo please add a PieChartData type that describes what it expects. */
const data: any = {
  data: [
    { key: "Berlin", value: null },
    { key: "Dortmund", value: null },
    { key: "Bonn", value: null },
    { key: "Cologne", value: null },
  ],
  renderAs: [DonutRenderer],
}

const data1 = {
  data: [
    { key: "Berlin", value: 0 },
    { key: "Dortmund", value: 0 },
    { key: "Bonn", value: 0 },
    { key: "Cologne", value: 0 },
  ],
  renderAs: [DonutRenderer],
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new PieChart(container)

  test("Renders the chart with no dataset", () => {
    viz.data({ renderAs: [DonutRenderer] })
    viz.draw()
  })

  test("Renders the chart with an empty dataset", () => {
    viz.data({ data: [], renderAs: [DonutRenderer] })
    viz.draw()
  })

  test("Renders the chart with only missing data", () => {
    viz.data(data)
    viz.draw()
  })

  test("Renders the chart with only 0 values", () => {
    viz.data(data1)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title = "Empty/no data"

// Must match the file name so we can link to the code on GitHub
export const slug = "general-1"
