import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"
import { deprecatedTheme } from "../../../src/utils/theme"

const LineRenderer = {
  type: "line",
}

const createData = (numberOfSeries: number) => {
  const data = {
    series: [],
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
    data.series.push({
      data: [{ x: new Date(2018, 2, 10), y: 0 }, { x: new Date(2018, 2, 17), y: (i + 1) * 50 }],
      name: `Series ${i + 1}`,
      key: `series-${i + 1}`,
      renderAs: [LineRenderer],
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

export const title: string = "Lines, changing palettes"

// Must match the file name so we can link to the code on GitHub
export const slug = "lines-2"
