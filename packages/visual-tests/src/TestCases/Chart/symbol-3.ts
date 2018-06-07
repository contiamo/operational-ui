import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const between = (min, max) => Math.random() * (max - min + 1) + min

const dataPoint = country => {
  const generators = {
    China: () => {
      const country = "China"
      const size = Math.floor(between(0.8, 1.5) * 1e6)
      const sales = size * between(0.01, 0.015)
      const profit = sales * between(0.1, 0.2)
      const store = Math.random() > 0.1 ? "MegaStore" : "Store"
      return { country, size, sales, profit, store }
    },
    Germany: () => {
      const country = "Germany"
      const size = Math.floor(between(0.2, 1) * 1e6)
      const sales = size * between(0.05, 0.3)
      const profit = sales * between(0.3, 0.5)
      const store = Math.random() > 0.3 ? "MegaStore" : "Store"
      return { country, size, sales, profit, store }
    },
    Netherlands: () => {
      const country = "Netherlands"
      const size = Math.floor(between(0.5, 0.8) * 1e6)
      const sales = size * between(0.1, 0.4)
      const profit = sales * between(0.4, 0.55)
      const store = Math.random() > 0.3 ? "MegaStore" : "Store"
      return { country, size, sales, profit, store }
    },
  }
  return generators[country]()
}

const generateData = (country, amount = 100) => {
  let result = []
  for (let i = 0; i < amount; i++) {
    result.push(dataPoint(country))
  }
  return result
}

const renderer = {
  type: "symbol",
  accessors: {
    fill: (series: any, d: any) => series.legendColor(),
    size: (series: any, d: any) => {
      const range = [5, 80]
      const domain = [0, 1.5 * 1e6]
      return range[0] + (range[1] - range[0]) * (d.size - domain[0]) / (domain[1] - domain[0])
    },
    stroke: () => "transparent",
    symbol: (series: any, d: any) => (d.store === "MegaStore" ? "cross" : "diamond"),
    opacity: (series: any, d: any) => 0.4,
  },
}

const createData = () => {
  return {
    series: [
      {
        data: generateData("China", 100),
        name: "China",
        key: "china",
        xAttribute: "profit",
        yAttribute: "sales",
        renderAs: [renderer],
      },
      {
        data: generateData("Germany", 100),
        name: "Germany",
        key: "germany",
        xAttribute: "profit",
        yAttribute: "sales",
        renderAs: [renderer],
      },
      {
        data: generateData("Netherlands", 100),
        name: "Netherlands",
        key: "netherlands",
        xAttribute: "profit",
        yAttribute: "sales",
        renderAs: [renderer],
      },
    ],
    axes: {
      x1: {
        type: "quant",
      },
      y1: {
        type: "quant",
      },
    },
  }
}

const symbols = {
  1: "circle",
  2: "cross",
  3: "diamond",
  4: "square",
  5: "squareDiamond",
  6: "star",
  7: "triangle",
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Render", () => {
    viz.data(createData())
    viz.draw()
  })

  test("Update data", () => {
    viz.data(createData())
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Symbols, scatterplot"

// Must match the file name so we can link to the code on GitHub
export const slug = "symbol-3"
