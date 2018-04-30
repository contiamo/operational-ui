import { Sunburst } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const config = {
  sort: false,
}

const data = {
  name: "All",
  value: "125190",
  children: [
    {
      name: "Europe",
      value: 50000,
    },
    {
      name: "Asia",
      value: 38400,
    },
    {
      name: "North America",
      value: 36780,
    },
  ],
}

const data1 = {
  name: "All",
  value: "150390",
  children: [
    {
      name: "Europe",
      value: 50000,
    },
    {
      name: "Asia",
      value: 38400,
    },
    {
      name: "North America",
      value: 36780,
    },
    {
      name: "Africa",
      value: 25200,
    },
  ],
}

const data2 = {
  name: "All",
  value: "168390",
  children: [
    {
      name: "Europe",
      value: 50000,
    },
    {
      name: "Asia",
      value: 38400,
    },
    {
      name: "Australia",
      value: 18000,
    },
    {
      name: "North America",
      value: 36780,
    },
    {
      name: "Africa",
      value: 25200,
    },
  ],
}

const data3 = {
  name: "All",
  value: "168390",
  children: [
    {
      name: "Europe",
      value: 50000,
      children: [
        {
          name: "UK",
          value: 11500,
        },
        {
          name: "Germany",
          value: 9240,
        },
        {
          name: "Spain",
          value: 12345,
        },
        {
          name: "Italy",
          value: 1830,
        },
      ],
    },
    {
      name: "Asia",
      value: 38400,
      children: [
        {
          name: "Japan",
          value: 8230,
        },
        {
          name: "China",
          value: 13000,
        },
        {
          name: "Thailand",
          value: 2548,
        },
        {
          name: "India",
          value: 1800,
        },
        {
          name: "Malaysia",
          value: 1423,
        },
      ],
    },
    {
      name: "Australia",
      value: 18000,
    },
    {
      name: "North America",
      value: 36780,
    },
    {
      name: "Africa",
      value: 25200,
    },
  ],
}

const data4 = {
  name: "All",
  value: "178390",
  children: [
    {
      name: "Europe",
      value: 50000,
      children: [
        {
          name: "UK",
          value: 11500,
        },
        {
          name: "Germany",
          value: 9240,
        },
        {
          name: "Spain",
          value: 12345,
        },
        {
          name: "Italy",
          value: 1830,
        },
      ],
    },
    {
      name: "Asia",
      value: 38400,
      children: [
        {
          name: "Japan",
          value: 8230,
        },
        {
          name: "China",
          value: 13000,
        },
        {
          name: "Thailand",
          value: 2548,
        },
        {
          name: "India",
          value: 1800,
        },
        {
          name: "Malaysia",
          value: 1423,
        },
      ],
    },
    {
      name: "Australia",
      value: 18000,
    },
    {
      name: "North America",
      value: 45700,
      children: [
        {
          name: "USA",
          value: 33218,
          children: [
            {
              name: "Washington DC",
              value: 5742,
            },
            {
              name: "California",
              value: 19200,
              children: [
                {
                  name: "San Fransisco",
                  value: 4298,
                },
                {
                  name: "Los Angeles",
                  value: 6528,
                },
                {
                  name: "Sacramento",
                  value: 3908,
                },
              ],
            },
            {
              name: "New York City",
              value: 8276,
            },
          ],
        },
        {
          name: "Canada",
          value: 6714,
          children: [
            {
              name: "Toronto",
              value: 2456,
            },
            {
              name: "Vancouver",
              value: 4258,
            },
          ],
        },
      ],
    },
    {
      name: "Africa",
      value: 25200,
    },
  ],
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Sunburst(container)

  test("Renders a sunburst chart", () => {
    viz.data(data)
    viz.config(config)
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
}

export const title: string = "Entering and updating"

// Must match the file name so we can link to the code on GitHub
export const slug: string = "case01"
