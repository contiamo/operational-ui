import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const AreaRenderer = {
  accessors: {
    interpolate: (series: any, d: any) => "monotoneX",
  },
  type: "area",
}

const LineRenderer = {
  accessors: {
    interpolate: (series: any, d: any) => "monotoneX",
  },
  type: "line",
}

const XFlagRenderer = {
  type: "flag",
  config: {
    axis: "x1",
  },
}

const YFlagRenderer = {
  type: "flag",
  accessors: {
    color: (series: any, d: any) => (d.y > 250 ? "red" : "purple"),
  },
  config: {
    axis: "y1",
  },
}

const createData = () => {
  return {
    series: [
      {
        data: [
          { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) },
          { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) },
        ],
        name: "Profit",
        key: "series1",
        renderAs: [AreaRenderer, LineRenderer],
      },
      {
        data: [
          { x: new Date(2018, 2, 12), description: "Event flag 1", direction: "up", label: "Flag 1" },
          { x: new Date(2018, 2, 14), description: "Event flag 2", direction: "down", label: "Flag 2" },
        ],
        hideInLegend: true,
        key: "series_flags_x",
        renderAs: [XFlagRenderer],
      },
      {
        data: [
          { y: Math.floor(Math.random() * 500), description: "Event flag 4", direction: "up", label: "Flag 4" },
          { y: Math.floor(Math.random() * 500), description: "Event flag 3", direction: "down", label: "Flag 3" },
        ],
        hideInLegend: true,
        key: "series_flags_y",
        renderAs: [YFlagRenderer],
      },
    ],
    axes: {
      x1: {
        type: "time",
        start: new Date(2018, 2, 11),
        end: new Date(2018, 2, 15),
        interval: "day",
        margin: 30,
        title: "2018",
      },
      y1: {
        type: "quant",
        unit: "k EUR",
        margin: 50,
        showRules: false,
        title: "Profit",
      },
    },
  }
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Renders the chart", () => {
    viz.data(createData())
    viz.draw()
  })

  test("Updates the flags", () => {
    viz.data(createData())
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Flags"

// Must match the file name so we can link to the code on GitHub
export const slug = "flags-1"
