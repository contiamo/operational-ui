import { PieChart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const GaugeRenderer = {
  type: "gauge",
  extent: "semi",
  comparison: { key: "Last month", value: 29 },
  target: 50,
}

const data = {
  data: [{ key: "Berlin", value: 35 }],
  renderAs: [GaugeRenderer],
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new PieChart(container)

  test("Renders the chart", () => {
    viz.data(data)
    viz.draw()
  })

  test("Resizes the chart", () => {
    viz.config({ width: 600, height: 400 })
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title = "Resizing (semi)"

// Must match the file name so we can link to the code on GitHub
export const slug = "gauge-5"
