import { PieChart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const DonutRenderer = {
  type: "donut",
}

const data = {
  data: [
    { key: "Berlin", value: 15 },
    { key: "Dortmund", value: 22 },
    { key: "Bonn", value: 5 },
    { key: "Cologne", value: 17 },
  ],
  renderAs: [DonutRenderer],
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new PieChart(container)

  test("Renders the chart", () => {
    viz.data(data)
    viz.draw()
  })

  test("Closes the chart", () => {
    viz.close()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title = "Closing chart"

// Must match the file name so we can link to the code on GitHub
export const slug = "general-2"
