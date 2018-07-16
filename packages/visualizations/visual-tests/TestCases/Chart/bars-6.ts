import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"
import { deprecatedTheme } from "../../../src/utils/theme"

const StackedRenderer = {
  type: "stacked",
  stackAxis: "y",
  renderAs: [{ type: "bars" }],
}

const createData = (numberOfSeries: number) => {
  const data = {
    series: [
      {
        series: [],
        renderAs: [StackedRenderer],
      },
    ],
    axes: {
      x1: {
        type: "time",
        start: new Date(2018, 2, 10),
        end: new Date(2018, 2, 17),
        interval: "day",
        title: "2018",
        rotateLabels: true,
      },
      y1: {
        type: "quant",
        title: "Total users",
      },
    },
  }

  for (let i = 0; i < numberOfSeries; i = i + 1) {
    data.series[0].series.push({
      data: [
        { x: new Date(2018, 2, 10), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 500) },
        { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 500) },
      ],
      name: `Series ${i + 1}`,
      key: `series-${i + 1}`,
    })
  }

  return data
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Qualitative / generic", () => {
    viz.config({ palette: deprecatedTheme.palettes.qualitative.generic })
    viz.data(createData(10))
    viz.draw()
  })

  test("Qualitative / pastel", () => {
    viz.config({ palette: deprecatedTheme.palettes.qualitative.pastel })
    viz.draw()
  })

  test("Qualitative / operational", () => {
    viz.config({ palette: deprecatedTheme.palettes.qualitative.operational })
    viz.draw()
  })

  test("Sequential / cool", () => {
    viz.config({ palette: deprecatedTheme.palettes.sequential.cool })
    viz.draw()
  })

  test("Sequential / sharp", () => {
    viz.config({ palette: deprecatedTheme.palettes.sequential.sharp })
    viz.draw()
  })

  test("Sequential / intense", () => {
    viz.config({ palette: deprecatedTheme.palettes.sequential.intense })
    viz.draw()
  })

  test("Diverging / rainbow", () => {
    viz.config({ palette: deprecatedTheme.palettes.diverging.rainbow })
    viz.draw()
  })

  test("Diverging / earthy", () => {
    viz.config({ palette: deprecatedTheme.palettes.diverging.earthy })
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Bars, changing palettes"

// Must match the file name so we can link to the code on GitHub
export const slug = "bars-6"
