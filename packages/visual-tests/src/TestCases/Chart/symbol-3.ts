import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const between = (min: number, max: number) => Math.random() * (max - min + 1) + min

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

type Country = keyof typeof generators

const dataPoint = (country: Country) => {
  return generators[country]()
}

const generateData = (country: Country, amount = 100) => {
  return Array(amount)
    .fill(0)
    .map(i => dataPoint(country))
}

const renderer = {
  type: "symbol",
  accessors: {
    fill: (series: any, d: any) => series.legendColor(),
    focusContent: (series: any, d: any) => [
      { name: "Country", value: d.country },
      { name: "Profit", value: d.profit },
      { name: "Sales", value: d.sales },
      { name: "Size", value: d.size },
      { name: "Store", value: d.store },
    ],
    size: (series: any, d: any) => {
      const range = [5, 80]
      const domain = [0, 1.5 * 1e6]
      return range[0] + ((range[1] - range[0]) * (d.size - domain[0])) / (domain[1] - domain[0])
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
        datumAccessors: {
          x: (d: any) => d.profit,
          y: (d: any) => d.sales,
        },
        renderAs: [renderer],
      },
      {
        data: generateData("Germany", 100),
        name: "Germany",
        key: "germany",
        datumAccessors: {
          x: (d: any) => d.profit,
          y: (d: any) => d.sales,
        },
        renderAs: [renderer],
      },
      {
        data: generateData("Netherlands", 100),
        name: "Netherlands",
        key: "netherlands",
        datumAccessors: {
          x: (d: any) => d.profit,
          y: (d: any) => d.sales,
        },
        renderAs: [renderer],
      },
    ],
    axes: {
      x1: {
        type: "quant",
        title: "Profit",
        rotateLabels: true,
      },
      y1: {
        type: "quant",
        title: "Sales",
      },
    },
  }
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
