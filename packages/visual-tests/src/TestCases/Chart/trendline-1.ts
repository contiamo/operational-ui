import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const between = (min: number, max: number) => Math.random() * (max - min + 1) + min

const generators = {
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

const createData = () => {
  const data = generateData("Netherlands", 100)
  const meanProfit = data.reduce((sum, d) => d.profit + sum, 0) / 100
  const meanSales = data.reduce((sum, d) => d.sales + sum, 0) / 100
  const maxProfit = Math.max(...data.map(d => d.profit))
  return {
    series: [
      {
        data,
        name: "Netherlands",
        key: "netherlands",
        xAttribute: "profit",
        yAttribute: "sales",
        renderAs: [renderer],
        legendColor: "#ff7f0e",
      },
      {
        data: [{ profit: 0, sales: 0 }, { profit: maxProfit, sales: maxProfit * (meanSales / meanProfit) }],
        key: "trendline",
        hideInLegend: true,
        xAttribute: "profit",
        yAttribute: "sales",
        renderAs: [trendline],
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

const trendline = {
  type: "line",
  accessors: {
    dashed: (series: any, d: any) => true,
    color: (series: any, d: any) => "#ff7f0e",
  },
}

const renderer = {
  type: "symbol",
  accessors: {
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
    symbol: (series: any, d: any) => "cross",
    opacity: (series: any, d: any) => 0.4,
    fill: (series: any, d: any) => series.legendColor(),
  },
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

export const title: string = "Trendline"

// Must match the file name so we can link to the code on GitHub
export const slug = "trendline-1"
