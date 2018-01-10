import Layout from "../../../../components/Layout"
import { PieChart } from "@operational/visualizations"
import Marathon from "../../../../components/Marathon"
import { Card, CardHeader } from "@operational/components"

const colors = {
  Berlin: "#1499CE",
  Dortmund: "#00B34D",
  Cologne: "#DE1A1A"
}

const GaugeRenderer = {
  type: "gauge",
  extent: "semi",
  comparison: { key: "Last month", value: 29 },
  target: 50,
  key: d => d.key,
  value: d => d.value,
  color: d => colors[d.key]
}

const data = {
  data: [{ key: "Berlin", value: 27 }, { key: "Dortmund", value: 12 }, { key: "Cologne", value: 7 }],
  renderAs: [GaugeRenderer]
}

export const marathon = ({ test, afterAll, container }) => {
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
