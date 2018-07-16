import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"
import { deprecatedTheme } from "../../../src/utils/theme"

const between = (min: number, max: number) => Math.random() * (max - min + 1) + min

const generator = () => {
  const size = Math.floor(between(0.8, 1.5) * 1e6)
  const sales = size * between(0.01, 0.015)
  const profit = sales * between(0.1, 0.2)
  const store = Math.random() > 0.1 ? "MegaStore" : "Store"
  return { size, sales, profit, store }
}

const generateData = (amount = 100) => {
  return Array(amount)
    .fill(0)
    .map(i => generator())
}

const renderer = (palette: string[]) => {
  return {
    type: "symbol",
    accessors: {
      fill: (series: any, d: any) => palette[Math.floor(d.sales / (2500000 / palette.length)) % palette.length],
      focusContent: (series: any, d: any) => [
        { name: "Country", value: d.country },
        { name: "Profit", value: d.profit },
        { name: "Sales", value: d.sales },
        { name: "Size", value: d.size },
        { name: "Store", value: d.store },
      ],
      size: (series: any, d: any) => {
        const range = [0, 80]
        const domain = [0, 1.5 * 1e6]
        return range[0] + ((range[1] - range[0]) * (d.size - domain[0])) / (domain[1] - domain[0])
      },
      stroke: () => "transparent",
      symbol: (series: any, d: any) => (d.store === "MegaStore" ? "cross" : "diamond"),
      opacity: (series: any, d: any) => 0.4,
    },
  }
}

const createData = (palette: string[]) => {
  return {
    series: [
      {
        data: generateData(100),
        key: "series1",
        hideInLegend: true,
        datumAccessors: {
          x: (d: any) => d.profit,
          y: (d: any) => d.sales,
        },
        renderAs: [renderer(palette)],
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

  test("Qualitative / generic", () => {
    viz.data(createData(deprecatedTheme.palettes.qualitative.generic))
    viz.draw()
  })

  test("Qualitative / pastel", () => {
    viz.data(createData(deprecatedTheme.palettes.qualitative.pastel))
    viz.draw()
  })

  test("Qualitative / operational", () => {
    viz.data(createData(deprecatedTheme.palettes.qualitative.operational))
    viz.draw()
  })

  test("Sequential / cool", () => {
    viz.data(createData(deprecatedTheme.palettes.sequential.cool))
    viz.draw()
  })

  test("Sequential / sharp", () => {
    viz.data(createData(deprecatedTheme.palettes.sequential.sharp))
    viz.draw()
  })

  test("Sequential / intense", () => {
    viz.data(createData(deprecatedTheme.palettes.sequential.intense))
    viz.draw()
  })

  test("Diverging / rainbow", () => {
    viz.data(createData(deprecatedTheme.palettes.diverging.rainbow))
    viz.draw()
  })

  test("Diverging / earthy", () => {
    viz.data(createData(deprecatedTheme.palettes.diverging.earthy))
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Symbols, changing palettes"

// Must match the file name so we can link to the code on GitHub
export const slug = "symbol-5"
