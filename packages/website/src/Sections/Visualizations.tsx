import * as React from "react"
import { VisualizationWrapper, PieChart, Sunburst, ProcessFlow } from "@operational/visualizations"
import { Div } from "glamorous"

export const title = "Visualizations"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/visualizations"

const config = {
  width: 220,
  height: 220
}

const pieData = {
  name: "Metric",
  data: [
    { key: "Berlin", value: 12 },
    { key: "Dortmund", value: 5 },
    { key: "Bonn", value: 7 },
    { key: "Cologne", value: 11 }
  ],
  renderAs: [{ type: "donut" }]
}

const processFlowData = {
  journeys: [
    { path: ["1", "3", "4", "5"], size: 1500 },
    { path: ["1", "3", "6"], size: 700 },
    { path: ["2", "3", "4", "6"], size: 1200 },
    { path: ["2", "6"], size: 300 }
  ],
  nodes: [
    { id: "1", group: "start" },
    { id: "2", group: "start" },
    { id: "3" },
    { id: "4" },
    { id: "5", group: "end" },
    { id: "6", group: "end" }
  ]
}

const processFlowConfig = {
  width: 200,
  height: 220,
  maxNodeSize: 300,
  nodeBorderWidth: 4
}

const processFlowAccessors = {
  node: {
    color: (node: any) => {
      if (node.group === "start") {
        return "lightgreen"
      }
      if (node.group === "end") {
        return "lightcoral"
      }
      return "#fff"
    },
    shape: (node: any) => {
      if (node.group === "start") {
        return "square"
      }
      if (node.group === "end") {
        return "circle"
      }
      return "squareDiamond"
    },
    stroke: (node: any) => {
      return node.group ? "none" : "#000"
    }
  },
  link: {
    stroke: (link: any) => {
      if (link.source.attributes.group === "start") {
        return "lightgreen"
      }
      if (link.target.attributes.group === "end") {
        return "lightcoral"
      }
      return "#bbb"
    }
  }
}

const sunburstData = {
  name: "All",
  value: 140000,
  children: [
    {
      name: "Europe",
      value: 52000,
      children: [
        {
          name: "UK",
          value: 11500,
          children: [
            {
              name: "London",
              value: 1500,
              children: [
                {
                  name: "Southwark",
                  value: 123
                },
                {
                  name: "Lambeth",
                  value: 523
                },
                {
                  name: "Marylebone",
                  value: 623
                }
              ]
            },
            {
              name: "Sheffield",
              value: 1642
            },
            {
              name: "Exeter",
              value: 935
            },
            {
              name: "Manchester",
              value: 2076
            },
            {
              name: "Leeds",
              value: 2970
            }
          ]
        },
        {
          name: "Germany",
          value: 9240,
          children: [
            {
              name: "Berlin",
              value: 1750,
              children: [
                {
                  name: "Kreuzberg",
                  value: 693
                },
                {
                  name: "Prenzlauer Berg",
                  value: 402
                },
                {
                  name: "Mitte",
                  value: 573
                }
              ]
            },
            {
              name: "Dortmund",
              value: 1756
            },
            {
              name: "Köln",
              value: 1902
            },
            {
              name: "München",
              value: 2340
            }
          ]
        },
        {
          name: "Spain",
          value: 2345,
          children: [
            {
              name: "Madrid",
              value: 1025
            },
            {
              name: "Barcelona",
              value: 522
            }
          ]
        },
        {
          name: "Italy",
          value: 830,
          children: [
            {
              name: "Rome",
              value: 307
            },
            {
              name: "Venice",
              value: 132
            },
            {
              name: "Naples",
              value: 196
            }
          ]
        }
      ]
    },
    {
      name: "Asia",
      value: 38400,
      children: [
        {
          name: "Japan",
          value: 8230,
          children: [
            {
              name: "Tokyo",
              value: 2353
            },
            {
              name: "Osaka",
              value: 1864
            }
          ]
        },
        {
          name: "China",
          value: 13000,
          children: [
            {
              name: "Beijing",
              value: 3852
            },
            {
              name: "Shanghai",
              value: 3623
            },
            {
              name: "Chengdu",
              value: 2546
            }
          ]
        },
        {
          name: "Thailand",
          value: 2548
        },
        {
          name: "India",
          value: 1800,
          children: [
            {
              name: "Mumbai",
              value: 987
            },
            {
              name: "Delhi",
              value: 632
            }
          ]
        },
        {
          name: "Malaysia",
          value: 1423
        }
      ]
    },
    {
      name: "North America",
      value: 43000,
      children: [
        {
          name: "USA",
          value: 33218,
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
      value: 4130,
      children: [
        {
          name: "South Africa",
          value: 1300,
          children: [
            {
              name: "Capetown",
              value: 1254
            }
          ]
        },
        {
          name: "Zimbabwe",
          value: 636
        },
        {
          name: "Tanzania",
          value: 132
        }
      ]
    }
  ]
}

export const Component = () => (
  <React.Fragment>
    <Div css={{ height: "250px" }}>
      <Div css={{ width: "fit-content", float: "left" }}>
        <p style={{ marginTop: "0px" }}>Pie Charts</p>
        <VisualizationWrapper facade={PieChart} data={pieData} config={config} />
      </Div>
      <Div css={{ width: "fit-content", float: "left" }}>
        <p style={{ marginTop: "0px" }}>Process Flow</p>
        <VisualizationWrapper
          facade={ProcessFlow}
          data={processFlowData}
          config={processFlowConfig}
          accessors={processFlowAccessors}
        />
      </Div>
      <Div css={{ width: "fit-content", float: "left" }}>
        <p style={{ marginTop: "0px" }}>Sunburst</p>
        <VisualizationWrapper facade={Sunburst} data={sunburstData} config={config} />
      </Div>
    </Div>
  </React.Fragment>
)
