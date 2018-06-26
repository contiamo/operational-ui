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

const BarsRenderer = {
  type: "bars",
}

const data_hour = {
  axes: {
    x1: {
      type: "time",
      showRules: true,
      start: new Date(2018, 2, 8, 0),
      end: new Date(2018, 2, 8, 23),
      interval: "hour",
      title: "Hourly",
    },
    y1: {
      type: "quant",
      title: "Pageviews",
    },
  },
  series: [
    {
      key: "series1",
      data: [
        { x: new Date(2018, 2, 8, 0), y: 100 },
        { x: new Date(2018, 2, 8, 1), y: 200 },
        { x: new Date(2018, 2, 8, 2), y: 175 },
        { x: new Date(2018, 2, 8, 3), y: 260 },
        { x: new Date(2018, 2, 8, 4), y: 100 },
        { x: new Date(2018, 2, 8, 5), y: 200 },
        { x: new Date(2018, 2, 8, 9), y: 175 },
        { x: new Date(2018, 2, 8, 10), y: 260 },
        { x: new Date(2018, 2, 8, 11), y: 100 },
        { x: new Date(2018, 2, 8, 13), y: 200 },
        { x: new Date(2018, 2, 8, 17), y: 175 },
        { x: new Date(2018, 2, 8, 18), y: 260 },
        { x: new Date(2018, 2, 8, 19), y: 220 },
        { x: new Date(2018, 2, 8, 20), y: 220 },
        { x: new Date(2018, 2, 8, 21), y: 220 },
        { x: new Date(2018, 2, 8, 22), y: 220 },
      ],
      renderAs: [LineRenderer, AreaRenderer],
    },
  ],
}

const data_day = {
  axes: {
    x1: {
      type: "time",
      showRules: true,
      start: new Date("March 8, 2018"),
      end: new Date("March 20, 2018"),
      interval: "day",
      title: "Daily",
    },
    y1: {
      type: "quant",
      title: "Pageviews",
    },
  },
  series: [
    {
      key: "series1",
      data: [
        { x: new Date(2018, 2, 11), y: 100 },
        { x: new Date(2018, 2, 12), y: 200 },
        { x: new Date(2018, 2, 13), y: 175 },
        { x: new Date(2018, 2, 14), y: 260 },
        { x: new Date(2018, 2, 15), y: 220 },
      ],
      renderAs: [LineRenderer, AreaRenderer],
    },
  ],
}

const data_week = {
  axes: {
    x1: {
      type: "time",
      showRules: true,
      start: new Date(2018, 2, 1),
      end: new Date(2018, 2, 31),
      interval: "week",
      title: "Weekly",
    },
    y1: {
      type: "quant",
      title: "Pageviews",
    },
  },
  series: [
    {
      key: "series1",
      data: [
        { x: new Date(2018, 2, 11), y: 100 },
        { x: new Date(2018, 2, 12), y: 200 },
        { x: new Date(2018, 2, 13), y: 175 },
        { x: new Date(2018, 2, 14), y: 260 },
        { x: new Date(2018, 2, 15), y: 220 },
      ],
      renderAs: [LineRenderer, AreaRenderer],
    },
  ],
}

const data_month = {
  axes: {
    x1: {
      type: "time",
      showRules: true,
      start: new Date(2018, 0),
      end: new Date(2018, 3),
      interval: "month",
      title: "Monthly",
    },
    y1: {
      type: "quant",
      title: "Pageviews",
    },
  },
  series: [
    {
      key: "series1",
      data: [
        { x: new Date(2018, 0), y: 100 },
        { x: new Date(2018, 1), y: 200 },
        { x: new Date(2018, 2), y: 175 },
        { x: new Date(2018, 3), y: 260 },
      ],
      renderAs: [LineRenderer, AreaRenderer],
    },
  ],
}

const data_quarter = {
  axes: {
    x1: {
      type: "time",
      showRules: true,
      start: new Date(2017, 0),
      end: new Date(2018, 3),
      interval: "quarter",
      title: "Quarterly",
    },
    y1: {
      type: "quant",
      title: "Pageviews",
    },
  },
  series: [
    {
      key: "series1",
      data: [
        { x: new Date(2017, 0), y: 100 },
        { x: new Date(2017, 3), y: 200 },
        { x: new Date(2017, 6), y: 175 },
        { x: new Date(2017, 9), y: 260 },
        { x: new Date(2018, 0), y: 200 },
        { x: new Date(2018, 3), y: 70 },
      ],
      renderAs: [LineRenderer, AreaRenderer],
    },
  ],
}

const data_year = {
  axes: {
    x1: {
      type: "time",
      showRules: true,
      start: new Date(2015, 0),
      end: new Date(2018, 0),
      interval: "year",
      title: "Annual",
    },
    y1: {
      type: "quant",
      title: "Pageviews",
    },
  },
  series: [
    {
      key: "series1",
      data: [
        { x: new Date(2015, 0), y: 700 },
        { x: new Date(2016, 0), y: 800 },
        { x: new Date(2017, 0), y: 675 },
        { x: new Date(2018, 0), y: 260 },
      ],
      renderAs: [LineRenderer, AreaRenderer],
    },
  ],
}

const data_year_bars = {
  axes: {
    x1: {
      type: "time",
      showRules: true,
      start: new Date(2015, 0),
      end: new Date(2018, 0),
      interval: "year",
      title: "Annual",
    },
    y1: {
      type: "quant",
      title: "Pageviews",
    },
  },
  series: [
    {
      key: "series1",
      data: [
        { x: new Date(2015, 0), y: 700 },
        { x: new Date(2016, 0), y: 800 },
        { x: new Date(2017, 0), y: 675 },
        { x: new Date(2018, 0), y: 260 },
      ],
      renderAs: [BarsRenderer],
    },
  ],
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Chart(container)

  test("Interval: hour", () => {
    viz.data(data_hour)
    viz.draw()
  })

  test("Interval: day", () => {
    viz.data(data_day)
    viz.draw()
  })

  test("Interval: week", () => {
    viz.data(data_week)
    viz.draw()
  })

  test("Interval: month", () => {
    viz.data(data_month)
    viz.draw()
  })

  test("Interval: quarter", () => {
    viz.data(data_quarter)
    viz.draw()
  })

  test("Interval: year", () => {
    viz.data(data_year)
    viz.draw()
  })

  test("Change renderer", () => {
    viz.data(data_year_bars)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title: string = "Time axis config"

// Must match the file name so we can link to the code on GitHub
export const slug = "axes-1"
