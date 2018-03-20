const propDescription = {
  Config: [
    {
      name: "duration",
      description: "Speed at which transitions are animated",
      defaultValue: "`1e3`",
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
      defaultValue: "`(x: number): string => x.toString().replace(/B(?=(d{3})+(?!d))/g, \",\")`",
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
      description: "Toggle component focus - if `true`, enables hover and click events on configurable items, in this case series items in legend",
      defaultValue: false,
      type: "boolean",
      optional: true
    },
    {
      name: "uid",
      description: "Unique identifier for the visualization, normally generated automatically from the visualization name",
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
      defaultValue: "`d => d.data`",
      type: "any",
      optional: true
    }
  ],
  SeriesAccessors: [
    {
      name: "name",
      description: "Series name",
      defaultValue: "`d => d.name || \"\"`",
      type: "string",
      optional: true
    },
    {
      name: "renderAs",
      description: "Renderer options",
      defaultValue: "`d => d.renderAs`",
      type: "`IObject[]`",
      optional: true
    }
  ]
}

# Pie Charts

The PieChart visualization encompasses 3 distinct renderers: donuts, gauges and polar area charts.

Donuts are similar to a standard pie chart, but with the total value of the data displayed in the centre.

Gauges give a visual representation of how the values of the data compare to a given target, and, where provided, a comparison total. Gauges can be either a full circle or, more commonly, only the top half of a circle.

Polar area charts are donut charts where the area representing the value of each datum varies through the radius of the segment rather than the angle. Polar area charts are essentially bar charts with the visual aesthetic of a pie chart.

## Usage

```js
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
```

For general use-cases, check out our collection of [visual test cases](/visualizations/pie-chart/testcases).

For more complicated use-cases of the donut chart, check out our collection of [donut chart visual test cases](/visualizations/pie-chart/donut_testcases).

For more complicated use-cases of the gauges, check out our collection of [gauges visual test cases](/visualizations/pie-chart/gauge_testcases).

For more complicated use-cases of the polar area chart, check out our collection of [polar area chart visual test cases](/visualizations/pie-chart/polar_testcases).

## Data

The input data should be an object with the following properties:

'data' is an array of objects, with each object represeting a single item. Each object should have the following properties:
 * key - the name of the item
 * value - the value of the item

'renderAs' is an array containing a single renderer object. Each renderer object must have the following properties:
* type - "donut", "gauge" or "polar"
* key - key accessor
* value - value accessor
* color - color accessor

Additionally, a gauge renderer must have:
* extent - "semi" or "full"
* target - numerical target

And may, optionally, have:
* comparison - object with properties "key" and "value" for comparison to current total and target

## Accessors

Accessors are used to tell the visualization about data structure (data accessors), and to determine how the data should be rendered (series accessors).

Accessors can take 2 forms: a function with single parameter 'd', or a constant value, which is transformed within the visualization into function which returns the given constant. Custom accessors must be exhaustive: if the returned values are dependent on some condition(s), all possible outcomes of the condition(s) must be explicitly dealt with.

## Data Accessors

Data accessors are required if the data can not be accessed from the input data via a property called 'data'.

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| data | Provides the attribute name for accessing data array from the input data | any | `d => d.data` | Yes |

## Series Accessors

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| name | Series name | string | `d => d.name || ""` | Yes |
| renderAs | Renderer options | `IObject[]` | `d => d.renderAs` | Yes |

## Config

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| duration | Speed at which transitions are animated | number | `1e3` | Yes |
| focusElement | Key of segment to be manually focussed. | string | undefined | Yes |
| height | Visualization height | number | 500 | Yes |
| hidden | Hide/show the visualization div | boolean | false | Yes |
| legend | Show/hide legend | boolean | true | Yes |
| maxWidth | Maximum radial width of segments | number | 100 | Yes |
| maxLegendRatio | Maximum legend:chart ratio | number | 1/2 | Yes |
| maxLegendWidth | Maximum legend width | number | 200 | Yes |
| maxTotalFontSize | Maximum font size of total displayed in centre of chart | number | 80 | Yes |
| minChartWithLegend | Minimum width/height of chart for which legend is still rendered | number | 1500 | Yes |
| minWidth | Minimum radial width of segments | number | 30 | Yes |
| minInnerRadius | Minimum inner radius for which inner circle is still rendered | number | 30 | Yes |
| minLegendWidth | Minimum legend width | number | 50 | Yes |
| minTotalFontSize | Minimum font size of total displayed in centre of chart | number | 11 | Yes |
| numberFormatter | Number formatter | function | `(x: number): string => x.toString().replace(/B(?=(d{3})+(?!d))/g, ",")` | Yes |
| outerBorderMargin | Margin between edge of chart and drawing area | number | 1 | Yes |
| showComponentFocus | Toggle component focus - if `true`, enables hover and click events on configurable items, in this case series items in legend | boolean | false | Yes |
| uid | Unique identifier for the visualization, normally generated automatically from the visualization name | string |  | Yes |
| visualizationName | Name of visualization | string | piechart | Yes |
| width | Visualization width | number | 500 | Yes |

