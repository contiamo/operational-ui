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

const data: any = {
  axes: {
    x1: {
      type: "time",
      start: new Date(2018, 2, 1),
      end: new Date(2018, 2, 15),
      interval: "day",
      title: "2018",
    },
    y1: {
      type: "quant",
      title: "New users",
    },
  },
  series: [
    {
      key: "series1",
      data: [
        { x: new Date(2018, 2, 1), y: 100 },
        { x: new Date(2018, 2, 2), y: 200 },
        { x: new Date(2018, 2, 3), y: 175 },
        { x: new Date(2018, 2, 4), y: 260 },
        { x: new Date(2018, 2, 5), y: 100 },
        { x: new Date(2018, 2, 6), y: 200 },
        { x: new Date(2018, 2, 7), y: 175 },
        { x: new Date(2018, 2, 8), y: 260 },
        { x: new Date(2018, 2, 9), y: 100 },
        { x: new Date(2018, 2, 10), y: 200 },
        { x: new Date(2018, 2, 11), y: 175 },
        { x: new Date(2018, 2, 12), y: 260 },
        { x: new Date(2018, 2, 13), y: 220 },
        { x: new Date(2018, 2, 14), y: 220 },
        { x: new Date(2018, 2, 15), y: 220 },
      ],
      renderAs: [LineRenderer, AreaRenderer],
    },
  ],
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Automatic quant axis", () => {
    viz.data(data)
    viz.draw()
  })

  test("Defined start", () => {
    data.axes.y1 = {
      type: "quant",
      title: "New Users",
      start: 75,
    }
    viz.data(data)
    viz.draw()
  })

  test("Defined end", () => {
    data.axes.y1 = {
      type: "quant",
      title: "New Users",
      end: 375,
    }
    viz.data(data)
    viz.draw()
  })

  test("Defined start and end", () => {
    data.axes.y1 = {
      type: "quant",
      title: "New Users",
      start: 50,
      end: 350,
    }
    viz.data(data)
    viz.draw()
  })

  test("Defined interval", () => {
    data.axes.y1 = {
      type: "quant",
      title: "New Users",
      interval: 30,
    }
    viz.data(data)
    viz.draw()
  })

  test("Defined interval and start", () => {
    data.axes.y1 = {
      type: "quant",
      title: "New Users",
      interval: 30,
      start: 75,
    }
    viz.data(data)
    viz.draw()
  })

  test("Defined interval and end", () => {
    data.axes.y1 = {
      type: "quant",
      title: "New Users",
      interval: 30,
      end: 375,
    }
    viz.data(data)
    viz.draw()
  })

  test("Defined interval, start and end", () => {
    data.axes.y1 = {
      type: "quant",
      title: "New Users",
      interval: 30,
      start: 75,
      end: 375,
    }
    viz.data(data)
    viz.draw()
  })

  test("Defined intervals", () => {
    data.axes.y1 = {
      type: "quant",
      title: "New Users",
      interval: 50,
      tickInterval: 25,
      ruleInterval: 100,
    }
    viz.data(data)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Quant axis config"

// Must match the file name so we can link to the code on GitHub
export const slug = "axes-2"
