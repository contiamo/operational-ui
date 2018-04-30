import { PieChart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const GaugeRenderer = {
  type: "gauge",
  extent: "semi",
  comparison: { key: "Last month", value: 29 },
  target: 50,
}

const data = {
  data: [{ key: "Berlin", value: 27 }, { key: "Dortmund", value: 12 }, { key: "Cologne", value: 7 }],
  renderAs: [GaugeRenderer],
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new PieChart(container)

  test("Renders the chart", () => {
    viz.data(data)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title = "Multiple datapoints"

// Must match the file name so we can link to the code on GitHub
export const slug = "gauge-7"
