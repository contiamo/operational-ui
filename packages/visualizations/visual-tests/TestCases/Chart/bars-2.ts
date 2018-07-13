import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const BarsRenderer = {
  type: "bars",
}

const TextRenderer = {
  type: "text",
}

const data: any = {
  series: [
    {
      data: [
        { x: new Date(2018, 2, 11), y: 100 },
        { x: new Date(2018, 2, 12), y: 300 },
        { x: new Date(2018, 2, 13), y: 500 },
        { x: new Date(2018, 2, 14), y: undefined },
        { x: new Date(2018, 2, 15), y: 200 },
      ],
      datumAccessors: {
        x: (d: any) => d.y,
        y: (d: any) => d.x,
      },
      name: "Pageviews",
      key: "series1",
      renderAs: [BarsRenderer, TextRenderer],
    },
    {
      data: [
        { x: new Date(2018, 2, 10), y: 500 },
        { x: new Date(2018, 2, 11), y: 450 },
        { x: new Date(2018, 2, 12), y: 250 },
        { x: new Date(2018, 2, 13), y: 425 },
        { x: new Date(2018, 2, 14), y: 570 },
        { x: new Date(2018, 2, 16), y: 234 },
        { x: new Date(2018, 2, 17), y: 123 },
      ],
      datumAccessors: {
        x: (d: any) => d.y,
        y: (d: any) => d.x,
      },
      name: "Users",
      key: "series1",
      renderAs: [BarsRenderer, TextRenderer],
    },
  ],
  axes: {
    y1: {
      type: "categorical",
      title: "2018",
    },
    x1: {
      type: "quant",
    },
  },
}

const createData = (renderers: any[]) => {
  return {
    series: [
      {
        data: [
          { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 14), y: undefined },
          { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) - 250 },
        ],
        name: "Pageviews: homepage",
        datumAccessors: {
          x: (d: any) => d.y,
          y: (d: any) => d.x,
        },
        key: "series1",
        renderAs: renderers,
      },
      {
        data: [
          { x: new Date(2018, 2, 10), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 11), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 12), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 13), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 14), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 500) - 250 },
        ],
        name: "Pageviews: explore view",
        datumAccessors: {
          x: (d: any) => d.y,
          y: (d: any) => d.x,
        },
        key: "series2",
        renderAs: renderers,
      },
    ],
    axes: {
      y1: {
        type: "time",
        start: new Date(2018, 2, 10),
        end: new Date(2018, 2, 17),
        interval: "day",
        title: "2018",
        rotateLabels: true,
      },
      x1: {
        type: "quant",
      },
    },
  }
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Render", () => {
    viz.data(data)
    viz.config({ width: 1500 })
    viz.draw()
  })

  test("Change to time axis", () => {
    viz.data(createData([BarsRenderer, TextRenderer]))
    viz.draw()
  })

  test("Increase tick padding", () => {
    viz.config({ outerBarSpacing: 20 })
    viz.draw()
  })

  test("Assign widths", () => {
    const barWidth = (series: any, d: any) => (series.key() === "series1" ? 20 : 10)
    viz.data(
      createData([
        {
          accessors: {
            barWidth,
          },
          type: "bars",
        },
      ]),
    )
    viz.draw()
  })

  test("Color accessors", () => {
    const barWidth = (series: any, d: any) => (series.key() === "series1" ? 20 : 10)
    const color = (series: any, d: any) => (d.y > 400 ? "red" : series.legendColor())
    viz.data(
      createData([
        {
          accessors: {
            barWidth,
            color,
          },
          type: "bars",
        },
      ]),
    )
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Bars, horizontal"

// Must match the file name so we can link to the code on GitHub
export const slug = "bars-2"
