import * as React from "react"
import Link from "next/link"
import { Card, CardHeader, Heading2Type } from "@operational/components"
import { PieChart, VisualizationWrapper } from "@operational/visualizations"

import Layout from "../../../components/Layout"
import Table from "../../../components/PropsTable"
import Playground from "../../../components/Playground"

const simpleSnippet = `
(() => {
  const colors = {
    "Berlin": "#1499CE",
    "Dortmund": "#00B34D",
    "Bonn": "#FFAE00",
    "Cologne": "#DE1A1A",
  }

  const accessors = {
    key: (d) => d.key,
    value: (d) => d.value,
    color: (d) => colors[d.key],
  }

  const DonutRenderer = {
    type: "donut",
    accessors
  }

  const GaugeRenderer = {
    type: "gauge",
    extent: "semi",
    comparison: { key: "Last month", value: 18 },
    target: 50,
    accessors
  }

  const PolarRenderer = {
    type: "polar",
    accessors
  }

  class Pie extends React.Component {

    state = {
      config: {
        width: 250,
        height: 250
      },
      data: {
        name: "Name",
        data: [
          { key: "Berlin", value: 12 },
          { key: "Dortmund", value: 5 },
          { key: "Bonn", value: 7 },
          { key: "Cologne", value: 11 },
          { key: "", value: 50 },
          { key: undefined, value: 70 },
          { key: "test", value: 0 },
          { key: "test2", value: undefined }
        ],
        renderAs: [DonutRenderer]
      },
      accessors: {}
    }

    render() {
      return (
        <VisualizationWrapper
          facade={PieChart}
          data={this.state.data}
          accessors={this.state.accessors}
          config={this.state.config}
        />
      )
    }
  }

  return (
    <div>
      <Pie />
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
      name: "focusElement",
      description: "Key of segment to be manually focussed.",
      defaultValue: undefined,
      type: "string",
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
      name: "legend",
      description: "Show/hide legend",
      defaultValue: "true",
      type: "boolean",
      optional: true
    },
    {
      name: "maxWidth",
      description: "Maximum radial width of segments",
      defaultValue: "100",
      type: "number",
      optional: true
    },
    {
      name: "maxLegendRatio",
      description: "Maximum legend:chart ratio",
      defaultValue: "1/2",
      type: "number",
      optional: true
    },
    {
      name: "maxLegendWidth",
      description: "Maximum legend width",
      defaultValue: "200",
      type: "number",
      optional: true
    },
    {
      name: "maxTotalFontSize",
      description: "Maximum font size of total displayed in centre of chart",
      defaultValue: "80",
      type: "number",
      optional: true
    },
    {
      name: "minChartWithLegend",
      description: "Minimum width/height of chart for which legend is still rendered",
      defaultValue: "1500",
      type: "number",
      optional: true
    },
    {
      name: "minWidth",
      description: "Minimum radial width of segments",
      defaultValue: "30",
      type: "number",
      optional: true
    },
    {
      name: "minInnerRadius",
      description: "Minimum inner radius for which inner circle is still rendered",
      defaultValue: "30",
      type: "number",
      optional: true
    },
    {
      name: "minLegendWidth",
      description: "Minimum legend width",
      defaultValue: "50",
      type: "number",
      optional: true
    },
    {
      name: "minTotalFontSize",
      description: "Minimum font size of total displayed in centre of chart",
      defaultValue: "11",
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
      name: "showComponentFocus",
      description:
        "Toggle component focus - if `true`, enables hover and click events on configurable items, in this case series items in legend",
      defaultValue: false,
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
      name: "name",
      description: "Series name",
      defaultValue: 'd => d.name || ""',
      type: "string",
      optional: true
    },
    {
      name: "renderAs",
      description: "Renderer options",
      defaultValue: "d => d.renderAs",
      type: "IObject[]",
      optional: true
    }
  ]
}

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>The PieChart visualization encompasses 3 distinct renderers: donuts, gauges and polar area charts.</p>

      <p>Donuts are similar to a standard pie chart, but with the total value of the data displayed in the centre.</p>

      <p>
        Gauges give a visual representation of how the values of the data compare to a given target, and, where
        provided, a comparison total. Gauges can be either a full circle or, more commonly, only the top half of a
        circle.
      </p>

      <p>
        Polar area charts are donut charts where the area representing the value of each datum varies through the radius
        of the segment rather than the angle. Polar area charts are essentially bar charts with the visual aesthetic of
        a pie chart.
      </p>

      <Heading2Type>Usage</Heading2Type>
      <Playground snippet={simpleSnippet} scope={{ PieChart }} components={{ VisualizationWrapper }} />

      <p>
        For general use-cases, check out our collection of{" "}
        <Link href="/visualizations/pie-chart/testcases">
          <a>visual test cases</a>
        </Link>.
      </p>

      <p>
        For more complicated use-cases of the donut chart, check out our collection of{" "}
        <Link href="/visualizations/pie-chart/donut_testcases">
          <a>donut chart visual test cases</a>
        </Link>.
      </p>

      <p>
        For more complicated use-cases of the gauges, check out our collection of{" "}
        <Link href="/visualizations/pie-chart/gauge_testcases">
          <a>gauges visual test cases</a>
        </Link>.
      </p>

      <p>
        For more complicated use-cases of the polar area chart, check out our collection of{" "}
        <Link href="/visualizations/pie-chart/polar_testcases">
          <a>polar area chart visual test cases</a>
        </Link>.
      </p>

      <Heading2Type>Data</Heading2Type>
      <p>The input data should be an object with the following properties:</p>

      <p>
        'data' is an array of objects, with each object represeting a single item. Each object should have the following
        properties:
      </p>
      <ul>
        <li>key - the name of the item</li>
        <li>value - the value of the item</li>
      </ul>

      <p>
        'renderAs' is an array containing a single renderer object. Each renderer object must have the following
        properties:
      </p>
      <ul>
        <li>type - "donut", "gauge" or "polar"</li>
        <li>key - key accessor</li>
        <li>value - value accessor</li>
        <li>color - color accessor</li>
      </ul>

      <p>Additionally, a gauge renderer must have:</p>
      <ul>
        <li>extent - "semi" or "full"</li>
        <li>target - numerical target</li>
      </ul>
      <p>and may, optionally, have:</p>
      <ul>
        <li>comparison - object with properties "key" and "value" for comparison to current total and target</li>
      </ul>

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
