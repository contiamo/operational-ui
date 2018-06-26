import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const BarsRenderer = {
  type: "bars",
}

const LineRenderer = {
  type: "line",
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
      title: "Category name",
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
    {
      key: "series2",
      data: [
        { x: "E", y: 300 },
        { x: "B", y: 160 },
        { x: "D", y: 205 },
        { x: "C", y: 220 },
        { x: "A", y: 80 },
        { x: "F", y: 190 },
      ],
      renderAs: [BarsRenderer],
    },
  ],
}

const data2: any = {
  axes: {
    x1: {
      type: "categorical",
      values: ["A", "B", "C", "D", "E", "F", "G", "H"],
      showRules: true,
      title: "Category name",
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
      renderAs: [LineRenderer],
    },
    {
      key: "series2",
      data: [
        { x: "E", y: 300 },
        { x: "B", y: 160 },
        { x: "D", y: 205 },
        { x: "C", y: 220 },
        { x: "A", y: 80 },
        { x: "F", y: 190 },
      ],
      renderAs: [LineRenderer],
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

  test("Change renderer", () => {
    viz.data(data2)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Categorical axis config"

// Must match the file name so we can link to the code on GitHub
export const slug = "axes-3"
