import { Chart } from "@operational/visualizations"
import { IMarathon } from "../../components/Marathon"

const AxesAccessors = {
  x: (series, d) => d.y,
  y: (series, d) => d.x
}

const AreaRenderer = {
  type: "area",
  accessors: { ...AxesAccessors }
}

const LineRenderer = {
  type: "line",
  accessors: { ...AxesAccessors }
}

const AreaRendererWithColor = {
  type: "area",
  accessors: {
    ...AxesAccessors,
    color: () => "#ccc"
  }
}

const AreaRendererWithInterpolation = {
  type: "area",
  accessors: {
    ...AxesAccessors,
    color: () => "#ccc",
    interpolate: () => "monotoneY"
  }
}

const LineRendererWithInterpolation = {
  type: "line",
  accessors: {
    ...AxesAccessors,
    interpolate: () => "monotoneY"
  }
}

const AreaRendererWithGaps = {
  type: "area",
  accessors: {
    ...AxesAccessors,
    color: () => "#ccc",
    interpolate: () => "monotoneY",
    closeGaps: () => false
  }
}

const LineRendererWithGaps = {
  type: "line",
  accessors: {
    ...AxesAccessors,
    interpolate: () => "monotoneY",
    closeGaps: () => false
  }
}

const LineRendererDashed = {
  type: "line",
  accessors: {
    ...AxesAccessors,
    interpolate: () => "monotoneY",
    closeGaps: () => false,
    dashed: () => true
  }
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
          { x: new Date(2018, 2, 15), y: 200 }
        ],
        name: "Pageviews 2018",
        key: "series1",
        interpolate: "step",
        renderAs: renderers
      },
      {
        data: [
          { x: new Date(2018, 2, 10), y: 500 },
          { x: new Date(2018, 2, 11), y: 450 },
          { x: new Date(2018, 2, 12), y: 250 },
          { x: new Date(2018, 2, 13), y: 425 },
          { x: new Date(2018, 2, 14), y: 570 },
          { x: new Date(2018, 2, 16), y: 234 },
          { x: new Date(2018, 2, 17), y: 123 }
        ],
        name: "Pageviews 2017",
        xAxis: "x2",
        key: "series2",
        renderAs: renderers
      }
    ],
    axes: {
      y1: {
        type: "time",
        start: new Date(2018, 2, 10),
        end: new Date(2018, 2, 17),
        interval: "day"
      },
      x1: {
        type: "quant"
      },
      x2: {
        type: "quant"
      }
    }
  }
}

export const marathon = ({ test, afterAll, container }: IMarathon): void => {
  const viz = new Chart(container)

  test("Render", () => {
    viz.data(createData([AreaRenderer, LineRenderer]))
    viz.draw()
  })

  test("Update colors", () => {
    viz.data(createData([AreaRendererWithColor, LineRenderer]))
    viz.draw()
  })

  test("Change interpolation", () => {
    viz.data(createData([AreaRendererWithInterpolation, LineRendererWithInterpolation]))
    viz.draw()
  })

  test("Turn off `closeGaps`", () => {
    viz.data(createData([AreaRendererWithGaps, LineRendererWithGaps]))
    viz.draw()
  })

  test("Dashed lines", () => {
    viz.data(createData([AreaRendererWithGaps, LineRendererDashed]))
    viz.draw()
  })

  test("Resize", () => {
    viz.config({
      width: 600,
      height: 300
    })
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Area/line, horizontal"
