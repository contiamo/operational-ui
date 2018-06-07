import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const BarsRenderer = {
  type: "bars",
}

const data: any = {
  axes: {
    x1: {
      type: "categorical",
      showRules: true,
    },
    y1: {
      type: "quant",
    },
  },
  series: [
    {
      key: "series1",
      data: [
        { x: "E", y: 100 },
        { x: "B", y: 200 },
        { x: "D", y: 175 },
        { x: "C", y: 260 },
        { x: "A", y: 100 },
        { x: "F", y: 200 },
      ],
      renderAs: [BarsRenderer],
    },
  ],
}

const data1: any = {
  axes: {
    x1: {
      type: "categorical",
      values: ["A", "B", "C", "D", "E", "F", "G", "H"],
      showRules: true,
    },
    y1: {
      type: "quant",
    },
  },
  series: [
    {
      key: "series1",
      data: [
        { x: "E", y: 100 },
        { x: "B", y: 200 },
        { x: "D", y: 175 },
        { x: "C", y: 260 },
        { x: "A", y: 100 },
        { x: "F", y: 200 },
      ],
      renderAs: [BarsRenderer],
    },
  ],
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Automatic categorical axis", () => {
    viz.data(data)
    viz.draw()
  })

  test("Configured values", () => {
    viz.data(data1)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Categorical axis config"

// Must match the file name so we can link to the code on GitHub
export const slug = "axes-3"
