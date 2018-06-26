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
    interpolate: () => "monotoneX",
  },
}

const LineRendererWithInterpolation = {
  type: "line",
  accessors: {
    interpolate: () => "monotoneX",
  },
}

const AreaRendererWithGaps = {
  type: "area",
  accessors: {
    color: () => "#ccc",
    interpolate: () => "monotoneX",
    closeGaps: () => false,
  },
}

const LineRendererWithGaps = {
  type: "line",
  accessors: {
    interpolate: () => "monotoneX",
    closeGaps: () => false,
  },
}

const LineRendererDashed = {
  type: "line",
  accessors: {
    interpolate: () => "monotoneX",
    closeGaps: () => false,
    dashed: () => true,
  },
}

const AreaRendererOpacity = {
  type: "area",
  accessors: {
    color: () => "#ccc",
    interpolate: () => "monotoneX",
    closeGaps: () => false,
    opacity: () => 0.2,
  },
}

const LineRendererOpacity = {
  type: "line",
  accessors: {
    interpolate: () => "monotoneX",
    closeGaps: () => false,
    dashed: () => true,
    opacity: () => 0.3,
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
          { x: new Date(2018, 2, 15), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 16), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 17), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 18), y: Math.floor(Math.random() * 500) - 250 },
          { x: new Date(2018, 2, 19), y: Math.floor(Math.random() * 500) - 250 },
        ],
        name: "Profit 2018",
        key: "series1",
        interpolate: "step",
        renderAs: renderers,
      },
    ],
    axes: {
      x1: {
        type: "time",
        start: new Date(2018, 2, 10),
        end: new Date(2018, 2, 19),
        interval: "day",
        title: "2018",
      },
      y1: {
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

  test("Reduce opacity", () => {
    viz.data(createData([AreaRendererOpacity, LineRendererOpacity, PointsRenderer]))
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

export const title: string = "Area/line"

// Must match the file name so we can link to the code on GitHub
export const slug = "area-1"
