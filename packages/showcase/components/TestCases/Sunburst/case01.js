import Layout from "../../../components/Layout"
import { Sunburst } from "@operational/visualizations"
import Marathon from "../../../components/Marathon"
import { Card, CardHeader } from "@operational/components"

const accessors: any = {
  children: (d: any): any[] => d.children,
  name: (d: any): string => d.name,
  value: (d: any): number => d.value,
  color: (d: any): string => d.color
}

const data = {
  name: "Pageviews",
  data: {
    name: "All",
    children: [
      {
        name: "Europe",
        color: "0f0",
        value: 50000
      },
      {
        name: "Asia",
        color: "0ff",
        value: 38400
      },
      {
        name: "North America",
        color: "f00",
        value: 36780
      }
    ]
  }
}

const data1 = {
  name: "Pageviews",
  data: {
    name: "All",
    children: [
      {
        name: "Europe",
        color: "0f0",
        value: 50000
      },
      {
        name: "Asia",
        color: "0ff",
        value: 38400
      },
      {
        name: "North America",
        color: "f00",
        value: 36780
      },
      {
        name: "Africa",
        color: "00f",
        value: 25200
      }
    ]
  }
}

const data2 = {
  name: "Pageviews",
  data: {
    name: "All",
    children: [
      {
        name: "Europe",
        color: "0f0",
        value: 50000
      },
      {
        name: "Asia",
        color: "0ff",
        value: 38400
      },
      {
        name: "Australia",
        color: "#ff0",
        value: 18000
      },
      {
        name: "North America",
        color: "f00",
        value: 36780
      },
      {
        name: "Africa",
        color: "00f",
        value: 25200
      }
    ]
  }
}

const data3 = {
  name: "Pageviews",
  data: {
    name: "All",
    children: [
      {
        name: "Europe",
        color: "0f0",
        value: 50000,
        children: [
          {
            name: "UK",
            value: 11500
          },
          {
            name: "Germany",
            value: 9240
          },
          {
            name: "Spain",
            value: 12345
          },
          {
            name: "Italy",
            value: 1830
          }
        ]
      },
      {
        name: "Asia",
        color: "0ff",
        value: 38400,
        children: [
          {
            name: "Japan",
            value: 8230
          },
          {
            name: "China",
            value: 13000
          },
          {
            name: "Thailand",
            value: 2548
          },
          {
            name: "India",
            value: 1800
          },
          {
            name: "Malaysia",
            value: 1423
          }
        ]
      },
      {
        name: "Australia",
        color: "#ff0",
        value: 18000
      },
      {
        name: "North America",
        color: "f00",
        value: 36780
      },
      {
        name: "Africa",
        color: "00f",
        value: 25200
      }
    ]
  }
}

const data4 = {
  name: "Pageviews",
  data: {
    name: "All",
    children: [
      {
        name: "Europe",
        color: "0f0",
        value: 50000,
        children: [
          {
            name: "UK",
            value: 11500
          },
          {
            name: "Germany",
            value: 9240
          },
          {
            name: "Spain",
            value: 12345
          },
          {
            name: "Italy",
            value: 1830
          }
        ]
      },
      {
        name: "Asia",
        color: "0ff",
        value: 38400,
        children: [
          {
            name: "Japan",
            value: 8230
          },
          {
            name: "China",
            value: 13000
          },
          {
            name: "Thailand",
            value: 2548
          },
          {
            name: "India",
            value: 1800
          },
          {
            name: "Malaysia",
            value: 1423
          }
        ]
      },
      {
        name: "Australia",
        color: "#ff0",
        value: 18000
      },
      {
        name: "North America",
        color: "f00",
        value: 36780,
        children: [
          {
            name: "USA",
            children: [
              {
                name: "Washington DC",
                value: 5742
              },
              {
                name: "California",
                value: 19200,
                children: [
                  {
                    name: "San Fransisco",
                    value: 4298
                  },
                  {
                    name: "Los Angeles",
                    value: 6528
                  },
                  {
                    name: "Sacramento",
                    value: 3908
                  }
                ]
              },
              {
                name: "New York City",
                value: 8276
              }
            ]
          },
          {
            name: "Canada",
            value: 6714,
            children: [
              {
                name: "Toronto",
                value: 2456
              },
              {
                name: "Vancouver",
                value: 4258
              }
            ]
          }
        ]
      },
      {
        name: "Africa",
        color: "00f",
        value: 25200
      }
    ]
  }
}

export const marathon = ({ test, afterAll, container }) => {
  const viz = new Sunburst(container)

  test("Renders a sunburst chart", () => {
    viz.data(data)
    viz.accessors("series", accessors)
    viz.draw()
  })

  test("Adds segment to end of ring", () => {
    viz.data(data1)
    viz.draw()
  })

  test("Inserts a segment into middle of ring", () => {
    viz.data(data2)
    viz.draw()
  })

  test("Adds a 2nd level", () => {
    viz.data(data3)
    viz.draw()
  })

  test("Adds multiple child levels to segment at once", () => {
    viz.data(data4)
    viz.draw()
  })

  test("Removes data", () => {
    viz.data(data3)
    viz.draw()
  })
}

export const title = "Data Updates"
