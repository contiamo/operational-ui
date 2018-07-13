import { Sunburst } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
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

  test("Close chart", () => {
    viz.close()
  })
}

export const title = "No data"

// Must match the file name so we can link to the code on GitHub
export const slug = "case03"
