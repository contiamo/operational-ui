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

'renderAs' is an array containing a single renderer object. Each renderer object must have the following propertie:
* type - "donut", "gauge" or "polar"
and may have any of the following accessors:
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

