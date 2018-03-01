import Layout from "../../../../components/Layout"
import { PieChart } from "@operational/visualizations"
import Marathon from "../../../../components/Marathon"
import { Card, CardHeader } from "@operational/components"

const PolarRenderer = {
  type: "polar"
}

const data = {
  data: [
    { key: "Berlin", value: 18 },
    { key: "Dortmund", value: 12 },
    { key: "Bonn", value: 4 },
    { key: "Cologne", value: 15 },
    { key: "Munich", value: 3 },
    { key: "Potsdam", value: 2 }
  ],
  renderAs: [PolarRenderer]
}

export const marathon = ({ test, afterAll, container }) => {
  const viz = new PieChart(container)

  test("Renders the chart", () => {
    viz.data(data)
    viz.draw()
  })

  test("Resizes the chart", () => {
    viz.config({ width: 300, height: 400 })
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title = "Resizing"
