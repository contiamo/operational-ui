import Layout from "../../../../components/Layout"
import { PieChart } from "@operational/visualizations"
import Marathon from "../../../../components/Marathon"
import { Card, CardHeader } from "@operational/components"

const colors = {
  Berlin: "#1499CE",
  Dortmund: "#00B34D",
  Bonn: "#FFAE00",
  Cologne: "#DE1A1A",
  Munich: "#f00",
  Potsdam: "#0f0"
}

const DonutRenderer = {
  type: "donut",
  key: d => d.key,
  value: d => d.value,
  color: d => colors[d.key]
}

const data = {
  data: [
    { key: "Berlin", value: 15 },
    { key: "Dortmund", value: null },
    { key: "Bonn", value: 8 },
    { key: "Cologne", value: 1 }
  ],
  renderAs: [DonutRenderer]
}

const data1 = {
  data: [
    { key: "Berlin", value: 18 },
    { key: "Dortmund", value: 12 },
    { key: "Bonn", value: undefined },
    { key: "Cologne", value: null },
    { key: "Munich", value: 3 },
    { key: "Potsdam", value: 2 }
  ],
  renderAs: [DonutRenderer]
}

export const marathon = ({ test, afterAll, container }) => {
  const viz = new PieChart(container)

  test("Renders the chart", () => {
    viz.data(data)
    viz.draw()
  })

  test("Updates the data", () => {
    viz.data(data1)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title = "Data updates"
