import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

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

  test("Render", () => {
    viz.data(createData(1))
    viz.draw()
  })

  test("Update", () => {
    viz.data(createData(2))
    viz.draw()
  })

  test("Update", () => {
    viz.data(createData(3))
    viz.draw()
  })

  test("Update", () => {
    viz.data(createData(4))
    viz.draw()
  })

  test("Update", () => {
    viz.data(createData(5))
    viz.draw()
  })

  test("Update", () => {
    viz.data(createData(6))
    viz.draw()
  })

  test("Update", () => {
    viz.data(createData(7))
    viz.draw()
  })

  test("Update", () => {
    viz.data(createData(8))
    viz.draw()
  })

  test("Update", () => {
    viz.data(createData(9))
    viz.draw()
  })

  test("Update", () => {
    viz.data(createData(10))
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Lines, adding series"

// Must match the file name so we can link to the code on GitHub
export const slug = "lines-1"
