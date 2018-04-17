import { Chart } from "@operational/visualizations"
import { IMarathon } from "../../components/Marathon"

const AreaRenderer = {
  type: "area"
}

const LineRenderer = {
  type: "line"
}

const AreaRendererWithColor = {
  type: "area",
  accessors: {
    color: () => "#ccc"
  }
}

const AreaRendererWithInterpolation = {
  type: "area",
  accessors: {
    color: () => "#ccc",
    interpolate: () => "monotoneX"
  }
}

const LineRendererWithInterpolation = {
  type: "line",
  accessors: {
    interpolate: () => "monotoneX"
  }
}

const AreaRendererWithGaps = {
  type: "area",
  accessors: {
    color: () => "#ccc",
    interpolate: () => "monotoneX",
    closeGaps: () => false
  }
}

const LineRendererWithGaps = {
  type: "line",
  accessors: {
    interpolate: () => "monotoneX",
    closeGaps: () => false
  }
}

const LineRendererDashed = {
  type: "line",
  accessors: {
    interpolate: () => "monotoneX",
    closeGaps: () => false,
    dashed: () => true
  }
}

const data: any = {
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
      renderAs: [AreaRenderer, LineRenderer]
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
      yAxis: "y2",
      key: "series2",
      renderAs: [AreaRenderer, LineRenderer]
    }
  ],
  axes: {
    x1: {
      type: "time",
      start: new Date(2018, 2, 10),
      end: new Date(2018, 2, 17),
      interval: "day"
    },
    y1: {
      type: "quant"
    },
    y2: {
      type: "quant"
    }
  }
}

export const marathon = ({ test, afterAll, container }: IMarathon): void => {
  const viz = new Chart(container)

  test("Render", () => {
    viz.data(data)
    viz.draw()
  })

  test("Update colors", () => {
    data.series[0].renderAs = [AreaRendererWithColor, LineRenderer]
    data.series[1].renderAs = [AreaRendererWithColor, LineRenderer]
    viz.data(data)
    viz.draw()
  })

  test("Change interpolation", () => {
    data.series[0].renderAs = [AreaRendererWithInterpolation, LineRendererWithInterpolation]
    data.series[1].renderAs = [AreaRendererWithInterpolation, LineRendererWithInterpolation]
    viz.data(data)
    viz.draw()
  })

  test("Turn off `closeGaps`", () => {
    data.series[0].renderAs = [AreaRendererWithGaps, LineRendererWithGaps]
    data.series[1].renderAs = [AreaRendererWithGaps, LineRendererWithGaps]
    viz.data(data)
    viz.draw()
  })

  test("Dashed line", () => {
    data.series[0].renderAs = [AreaRendererWithGaps, LineRendererDashed]
    viz.data(data)
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

export const title: string = "Area/line"
