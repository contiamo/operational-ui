import Layout from "../../../components/Layout"
import { Sunburst } from "@operational/visualizations"
import Marathon from "../../../components/Marathon"
import { Card, CardHeader } from "@operational/components"

export const marathon = ({ test, afterAll, container }) => {
  const viz = new Sunburst(container)

  test("No data", () => {
    viz.draw()
  })

  test("Empty dataset", () => {
    viz.data({})
    viz.draw()
  })

  test("Only center node", () => {
    viz.data({ name: "Testing", value: 50 })
    viz.draw()
  })
}

export const title = "No data"
