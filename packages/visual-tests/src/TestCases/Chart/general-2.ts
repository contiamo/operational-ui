import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const LineRenderer = {
  accessors: {
    interpolate: () => "monotoneX",
  },
  type: "line",
}

const AreaRenderer = {
  accessors: {
    interpolate: () => "monotoneX",
  },
  type: "area",
}

const axes: any = {
  x1: {
    type: "time",
    start: new Date("March 8, 2018"),
    end: new Date("March 20, 2018"),
    interval: "day",
  },
  y1: {
    type: "quant",
  },
}

const data = {
  axes,
  series: [
    {
      key: "series1",
      data: [
        { x: new Date("March 11, 2018"), y: 100 },
        { x: new Date("March 12, 2018"), y: 200 },
        { x: new Date("March 13, 2018"), y: 175 },
        { x: new Date("March 14, 2018"), y: 260 },
        { x: new Date("March 15, 2018"), y: 220 },
      ],
      renderAs: [LineRenderer, AreaRenderer],
    },
  ],
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Renders a chart", () => {
    viz.data(data)
    viz.draw()
  })

  test("Closes the chart", () => {
    viz.close()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Closing chart"

// Must match the file name so we can link to the code on GitHub
export const slug = "general-2"
