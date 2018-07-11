import { ProcessFlow } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const data = {
  journeys: [{ path: ["1", "2", "3", "4"], size: 1500 }, { path: ["5", "2", "3", "6"], size: 1200 }],
  nodes: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }],
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new ProcessFlow(container)

  test("Renders a process flow viz", () => {
    viz.data(data)
    viz.draw()
  })

  test("Changes the horizontal and vertical node distances", () => {
    viz.config({
      horizontalNodeSpacing: 70,
      verticalNodeSpacing: 120,
    })
    viz.draw()
  })

  test("Fixes the width and height", () => {
    viz.config({
      width: 400,
      height: 400,
    })
    viz.draw()
  })

  test("Resets width and height to Infinity", () => {
    viz.config({
      width: Infinity,
      height: Infinity,
    })
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title = "Resizing"

// Must match the file name so we can link to the code on GitHub
export const slug = "case05"
