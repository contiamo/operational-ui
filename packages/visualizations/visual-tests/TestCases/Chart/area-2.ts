import { Chart } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const AreaRenderer = {
  type: "area",
}

const LineRenderer = {
  type: "line",
}

const PointsRenderer = {
  type: "symbol",
  accessors: {
    size: (series: any, d: any) => 20,
  },
}

const AreaRendererWithColor = {
  type: "area",
  accessors: {
    color: () => "#ccc",
  },
}

const AreaRendererWithInterpolation = {
  type: "area",
  accessors: {
    color: () => "#ccc",
    interpolate: () => "monotoneY",
  },
}

const LineRendererWithInterpolation = {
  type: "line",
  accessors: {
    interpolate: () => "monotoneY",
  },
}

const AreaRendererWithGaps = {
  type: "area",
  accessors: {
    color: () => "#ccc",
    interpolate: () => "monotoneY",
    closeGaps: () => false,
  },
}

const LineRendererWithGaps = {
  type: "line",
  accessors: {
    interpolate: () => "monotoneY",
    closeGaps: () => false,
  },
}

const LineRendererDashed = {
  type: "line",
  accessors: {
    interpolate: () => "monotoneY",
    closeGaps: () => false,
    dashed: () => true,
  },
}

const createData = (renderers: any[]) => {
  return {
    series: [
      {
        data: [
          { x: new Date(2018, 2, 11), y: 100 },
          { x: new Date(2018, 2, 12), y: 300 },
          { x: new Date(2018, 2, 13), y: 500 },
          { x: new Date(2018, 2, 14), y: undefined },
          { x: new Date(2018, 2, 15), y: 200 },
        ],
        name: "Product 1",
        datumAccessors: {
          x: (d: any) => d.y,
          y: (d: any) => d.x,
        },
        key: "series1",
        interpolate: "step",
        renderAs: renderers,
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
        name: "Product 2",
        datumAccessors: {
          x: (d: any) => d.y,
          y: (d: any) => d.x,
        },
        xAxis: "x2",
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
      },
      x1: {
        type: "quant",
        title: "Profit",
        unit: "k€",
      },
      x2: {
        type: "quant",
        title: "Profit",
        unit: "k€",
      },
    },
  }
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Render", () => {
    viz.data(createData([AreaRenderer, LineRenderer, PointsRenderer]))
    viz.draw()
  })

  test("Update colors", () => {
    viz.data(createData([AreaRendererWithColor, LineRenderer, PointsRenderer]))
    viz.draw()
  })

  test("Change interpolation", () => {
    viz.data(createData([AreaRendererWithInterpolation, LineRendererWithInterpolation, PointsRenderer]))
    viz.draw()
  })

  test("Turn off `closeGaps`", () => {
    viz.data(createData([AreaRendererWithGaps, LineRendererWithGaps, PointsRenderer]))
    viz.draw()
  })

  test("Dashed lines", () => {
    viz.data(createData([AreaRendererWithGaps, LineRendererDashed, PointsRenderer]))
    viz.draw()
  })

  test("Resize", () => {
    viz.config({
      width: 600,
      height: 300,
    })
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Area/line, horizontal"

// Must match the file name so we can link to the code on GitHub
export const slug = "area-2"
