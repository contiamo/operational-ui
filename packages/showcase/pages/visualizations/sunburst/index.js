import * as React from "react"
import Link from "next/link"
import { Card, CardHeader, Heading2Type } from "@operational/components"
import { Sunburst, VisualizationWrapper } from "@operational/visualizations"

import Layout from "../../../components/Layout"
import Table from "../../../components/PropsTable"
import Playground from "../../../components/Playground"

const simpleSnippet = `
(() => {
  class Viz extends React.Component {

    state = {
      config: {
        width: 500,
        height: 500
      },
      data: {
        "name": "Pageviews",
        "data": {
          "name": "All",
          "value": 140000,
          "children": [
            {
              "name": "Europe",
              "color": "0f0",
              "value": 52000,
              "children": [
                {
                  "name": "UK",
                  "value": 11500,
                  "children": [
                    {
                      "name": "London",
                      "value": 1500,
                      "children": [
                        {
                          "name": "Southwark",
                          "value": 123,
                        },
                        {
                          "name": "Lambeth",
                          "value": 523,
                        },
                        {
                          "name": "Marylebone",
                          "value": 623
                        },
                      ]
                    },
                    {
                      "name": "Sheffield",
                      "value": 1642,
                    },
                    {
                      "name": "Exeter",
                      "value": 935,
                    },
                    {
                      "name": "Manchester",
                      "value": 2076,
                    },
                    {
                      "name": "Leeds",
                      "value": 2970
                    },
                  ]
                },
                {
                  "name": "Germany",
                  "value": 9240,
                  "children": [
                    {
                      "name": "Berlin",
                      "value": 1750,
                      "children": [
                        {
                          "name": "Kreuzberg",
                          "value": 693,
                        },
                        {
                          "name": "Prenzlauer Berg",
                          "value": 402,
                        },
                        {
                          "name": "Mitte",
                          "value": 573
                        },
                      ]
                    },
                    {
                      "name": "Dortmund",
                      "value": 1756,
                    },
                    {
                      "name": "Köln",
                      "value": 1902,
                    },
                    {
                      "name": "München",
                      "value": 2340
                    },
                  ]
                },
                {
                  "name": "Spain",
                  "value": 2345,
                  "children": [
                    {
                      "name": "Madrid",
                      "value": 1025,
                    },
                    {
                      "name": "Barcelona",
                      "value": 522
                    },
                  ]
                },
                {
                  "name": "Italy",
                  "value": 830,
                  "children": [
                    {
                      "name": "Rome",
                      "value": 307,
                    },
                    {
                      "name": "Venice",
                      "value": 132,
                    },
                    {
                      "name": "Naples",
                      "value": 196
                    },
                  ]
                }
              ]
            },
            {
              "name": "Asia",
              "color": "0ff",
              "value": 38400,
              "children": [
                {
                  "name": "Japan",
                  "value": 8230,
                  "children": [
                    {
                      "name": "Tokyo",
                      "value": 2353,
                    },
                    {
                      "name": "Osaka",
                      "value": 1864
                    },
                  ]
                },
                {
                  "name": "China",
                  "value": 13000,
                  "children": [
                    {
                      "name": "Beijing",
                      "value": 3852,
                    },
                    {
                      "name": "Shanghai",
                      "value": 3623,
                    },
                    {
                      "name": "Chengdu",
                      "value": 2546
                    },
                  ]
                },
                {
                  "name": "Thailand",
                  "value": 2548,
                },
                {
                  "name": "India",
                  "value": 1800,
                  "children": [
                    {
                      "name": "Mumbai",
                      "value": 987,
                    },
                    {
                      "name": "Delhi",
                      "value": 632
                    },
                  ]
                },
                {
                  "name": "Malaysia",
                  "value": 1423
                },
              ]
            },
            {
              "name": "North America",
              "color": "f00",
              "value": 43000,
              "children": [
                {
                  "name": "USA",
                  "value": 33218,
                  "children": [
                    {
                      "name": "Washington DC",
                      "value": 5742,
                    },
                    {
                      "name": "California",
                      "value": 19200,
                      "children": [
                        {
                          "name": "San Fransisco",
                          "value": 4298,
                        },
                        {
                          "name": "Los Angeles",
                          "value": 6528,
                        },
                        {
                          "name": "Sacramento",
                          "value": 3908
                        },
                      ]
                    },
                    {
                      "name": "New York City",
                      "value": 8276
                    },
                  ]
                },
                {
                  "name": "Canada",
                  "value": 6714,
                  "children": [
                    {
                      "name": "Toronto",
                      "value": 2456,
                    },
                    {
                      "name": "Vancouver",
                      "value": 4258
                    },
                  ]
                }
              ]
            },
            {
              "name": "Africa",
              "value": 4130,
              "children": [
                {
                  "name": "South Africa",
                  "value": 1300,
                  "children": [
                    {
                      "name": "Capetown",
                      "value": 1254
                    }
                  ]

                },
                {
                  "name": "Zimbabwe",
                  "value": 636
                },
                {
                  "name": "Tanzania",
                  "value": 132
                }
              ]
            }
          ]
        }
      },
      accessors: {
        data: {
          data: (d) => d.data
        }
      }
    }

    render() {
      return (
        <VisualizationWrapper
          facade={Sunburst}
          data={this.state.data}
          accessors={this.state.accessors}
          config={this.state.config}
        />
      )
    }
  }

  return (
    <div>
      <Viz />
    </div>
  )
})()
`

const propDescription = {
  Config: [
    {
      name: "duration",
      description: "Speed at which transitions are animated",
      defaultValue: "1e3",
      type: "number",
      optional: true
    },
    {
      name: "height",
      description: "Visualization height",
      defaultValue: "500",
      type: "number",
      optional: true
    },
    {
      name: "hidden",
      description: "Hide/show the visualization div",
      defaultValue: "false",
      type: "boolean",
      optional: true
    },
    {
      name: "maxRings",
      description: "Maximum number of rings to display",
      defaultValue: "10",
      type: "number",
      optional: true
    },
    {
      name: "numberFormatter",
      description: "Number formatter",
      defaultValue: '(x: number): string => x.toString().replace(/B(?=(d{3})+(?!d))/g, ",")',
      type: "function",
      optional: true
    },
    {
      name: "outerBorderMargin",
      description: "Margin between edge of chart and drawing area",
      defaultValue: "1",
      type: "number",
      optional: true
    },
    {
      name: "sort",
      description: "Whether to sort nodes by size",
      defaultValue: "true",
      type: "boolean",
      optional: true
    },
    {
      name: "uid",
      description:
        "Unique identifier for the visualization, normally generated automatically from the visualization name",
      defaultValue: "",
      type: "string",
      optional: true
    },
    {
      name: "visualizationName",
      description: "Name of visualization",
      defaultValue: "piechart",
      type: "string",
      optional: true
    },
    {
      name: "width",
      description: "Visualization width",
      defaultValue: "500",
      type: "number",
      optional: true
    },
    {
      name: "zoomNode",
      description: "Key/value pairs to identify node to zoom",
      defaultValue: "undefined",
      type: "object",
      optional: true
    }
  ],
  DataAccessors: [
    {
      name: "data",
      description: "Provides the attribute name for accessing data array from the input data",
      defaultValue: "d => d.data",
      type: "any",
      optional: true
    }
  ],
  SeriesAccessors: [
    {
      name: "color",
      description: "Node color",
      defaultValue: "d => d.color",
      type: "string",
      optional: true
    },
    {
      name: "name",
      description: "Node name",
      defaultValue: 'd => d.name || ""',
      type: "string",
      optional: true
    },
    {
      name: "value",
      description: "Node value",
      defaultValue: "d => d.value",
      type: "number",
      optional: true
    }
  ]
}

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        The Sunburst chart is a hierarchical pie chart. The central circle represents the root node, and each
        consecutive ring moving out from the center represents the next level in the hierarchy.
      </p>

      <p>
        Clicking on a node triggers a zoom to that node (providing the selected node has child nodes), rerendering the
        chart as if the selected node were the root node. If the user clicks on the inner circle of a zoomed-in display,
        the chart zooms out by one level. The path to the current zoom level, extended by the path the user is hovering
        over, if applicable, is shown in the breadcrumb above the chart. Clicking on any item in the breadcrumb zooms to
        that node.
      </p>

      <Heading2Type>Usage</Heading2Type>
      <Playground snippet={simpleSnippet} scope={{ Sunburst }} components={{ VisualizationWrapper }} />

      <p>
        For more complicated use-cases of the sunburst chart, check out our collection of{" "}
        <Link href="/visualizations/sunburst/testcases">
          <a>sunburst chart visual test cases</a>
        </Link>.
      </p>

      <Heading2Type>Data</Heading2Type>
      <p>The input data should be an object in the following format:</p>

      <Heading2Type>Accessors</Heading2Type>
      <p>
        Accessors are used to tell the visualization about data structure (data accessors), and to determine how the
        data should be rendered (series accessors).
      </p>

      <p>
        Accessors can take 2 forms: a function with single parameter 'd', or a constant value, which is transformed
        within the visualization into function which returns the given constant. Custom accessors must be exhaustive: if
        the returned values are dependent on some condition(s), all possible outcomes of the condition(s) must be
        explicitly dealt with.
      </p>

      <Heading2Type>Data Accessors</Heading2Type>
      <p>
        Data accessors are required if the data can not be accessed from the input data via a property called 'data'.
      </p>
      <Table props={propDescription.DataAccessors} />

      <Heading2Type>Series Accessors</Heading2Type>
      <Table props={propDescription.SeriesAccessors} />

      <Heading2Type>Config</Heading2Type>
      <Table props={propDescription.Config} />
    </Card>
  </Layout>
)
