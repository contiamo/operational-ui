import Layout from "../../../components/Layout"
import { PieChart } from "@operational/visualizations"
import Marathon from "../../../components/Marathon"
import { Card, CardHeader } from "@operational/components"

const colors = {
  Berlin: "#1499CE",
  Dortmund: "#00B34D",
  Bonn: "#FFAE00",
  Cologne: "#DE1A1A"
}

const DonutRenderer = {
  type: "donut",
  key: d => d.key,
  value: d => d.value,
  color: d => colors[d.key]
}

const data = {
  data: [
    { key: "Berlin", value: null },
    { key: "Dortmund", value: null },
    { key: "Bonn", value: null },
    { key: "Cologne", value: null }
  ],
  renderAs: [DonutRenderer]
}

const data1 = {
  data: [
    { key: "Berlin", value: 0 },
    { key: "Dortmund", value: 0 },
    { key: "Bonn", value: 0 },
    { key: "Cologne", value: 0 }
  ],
  renderAs: [DonutRenderer]
}

export const marathon = ({ test, afterAll, container }) => {
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
