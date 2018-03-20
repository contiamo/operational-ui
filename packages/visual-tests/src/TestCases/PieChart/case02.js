import Layout from "../../../components/Layout"
import { PieChart } from "@operational/visualizations"
import Marathon from "../../../components/Marathon"
import { Card, CardHeader } from "@operational/components"

const DonutRenderer = {
  type: "donut"
}

const data = {
  data: [
    { key: "Berlin", value: 15 },
    { key: "Dortmund", value: 22 },
    { key: "Bonn", value: 5 },
    { key: "Cologne", value: 17 }
  ],
  renderAs: [DonutRenderer]
}

export const marathon = ({ test, afterAll, container }) => {
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
