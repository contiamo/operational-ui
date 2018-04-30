import { PieChart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const PolarRenderer = {
  type: "polar",
}

const data = {
  data: [
    { key: "Berlin", value: 15 },
    { key: "Dortmund", value: null },
    { key: "Bonn", value: 8 },
    { key: "Cologne", value: 1 },
  ],
  renderAs: [PolarRenderer],
}

const data1 = {
  data: [
    { key: "Berlin", value: 18 },
    { key: "Dortmund", value: 12 },
    { key: "Bonn", value: undefined },
    { key: "Cologne", value: null },
    { key: "Munich", value: 3 },
    { key: "Potsdam", value: 2 },
  ],
  renderAs: [PolarRenderer],
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
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

// Must match the file name so we can link to the code on GitHub
export const slug = "polar-1"
