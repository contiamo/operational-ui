# Charts

The Chart visualization covers all basic axial charts. There are 3 axis types: quantitative, time and categorical. Multiple x and y axes can be configured.

There are several renderers which can be combined if desired:
- Symbols
- Bars
- Lines
- Areas
- Text labels

## Usage

```js
(() => {
  const AreaRenderer = {
    accessors: {
      interpolate: "monotoneX"
    },
    type: "area",
  }

  const LineRenderer = {
    accessors: {
      interpolate: "monotoneX"
    },
    type: "line",
  }

  const data: any = {
    series: [
      {
        data: [
          { x: new Date(2018, 2, 11), y: 100 },
          { x: new Date(2018, 2, 12), y: 300 },
          { x: new Date(2018, 2, 13), y: 500 },
          { x: new Date(2018, 2, 14), y: 300 },
          { x: new Date(2018, 2, 15), y: 200 },
        ],
        name: "Pageviews 2018",
        key: "series1",
        renderAs: [AreaRenderer, LineRenderer],
      },
      {
        data: [
          { x: new Date(2018, 2, 10), y: 500 },
          { x: new Date(2018, 2, 11), y: 450 },
          { x: new Date(2018, 2, 12), y: 250 },
          { x: new Date(2018, 2, 13), y: 425 },
          { x: new Date(2018, 2, 14), y: 570 },
        ],
        name: "Pageviews 2017",
        yAxis: "y2",
        key: "series2",
        renderAs: [AreaRenderer, LineRenderer],
      },
    ],
    axes: {
      x1: {
        type: "time",
        start: new Date(2018, 2, 10),
        end: new Date(2018, 2, 15),
        interval: "day",
      },
      y1: {
        type: "quant",
      },
      y2: {
        type: "quant",
      },
    },
  }

  class Chart extends React.Component {
    state = {
      config: {
        width: 250,
        height: 250
      },
      data: data,
      accessors: {}
    }

    render() {
      return (
        <VisualizationWrapper
          facade={Chart}
          data={this.state.data}
          accessors={this.state.accessors}
          config={this.state.config}
        />
      )
    }
  }

  return (
    <div>
      <Chart />
    </div>
  )
})()
```

For general use-cases, check out our collection of [visual test cases](/visualizations/chart/testcases).

## Data

The input data should be an object containing information about the series to render, and axis configuration. The default structure is as follows:

```js
{
  axes: {
    x1: { ... },
    y1: { ... }
  },
  series: [
    { ... },
    { ... }
  ]
}
```
The 'series' and 'axes' properties can have different names, if the data accessors are set accordingly.

### Axes
'axes' is an object containing axis configurations. Each axis _must_ have a 'type' property ('quant', 'time' or 'categorical') and _may_ also have axis specific or general axis configuration properties. The general axis configuration properties available are:
* margin - default: 34
* minTicks - default: 4
* minTopOffsetTopTick - default: 21 (only applicable to y axes)
* tickSpacing - default: 40
* outerPadding - default: 3
* showRules - defaults to true for quant axes, false for time and categorical

Quant axes _may_ additionally have any of the following configurations:
* start: number
* end: number
* interval: number
* unit: string

Time axes _must_ have:
* start: Date
* end: Date
* interval: "hour" | "day" | "week" | "month" | "quarter" | "year"

Categorical axes _may_ have:
* values: string[] - this property provides the list of values to display *in the desired order*

### Series
'series' is an array of objects. There are 2 types of series objects:

(1) An object representing a single data series or metric, with the following properties:
 * data - an array of data points
 * key - the id of the series
 * name - the name of the series
 * renderAs - an array of renderer config objects ([see below](#renderer-objects))

 Variation in these property names needs to be defined in the series accessors.

(2) An object representing grouped series/metrics, with the following properties:
 * series - an array of single series objects, as above, but without their own 'renderAs' properties
 * renderAs - an array with a single grouped renderer config object ([see below](#grouped-renderer-objects))

### <a name="renderer-objects"></>Renderer objects
The 'renderAs' property of a series (or the returned value of the 'renderAs' series accessor) should be an array of renderer objects. The only property that each of these _must_ have is:
* type - "area" | "bars" | "flag" | "line" | "symbol" | "text"

Additionally, each renderer object _may_ also have the following properties:
* accessors - renderer-specific accessors ([see below](#renderer-accessors))
* config - renderer-specific config ([see below](#renderer-config))

### <a name="grouped-renderer-objects"></>Grouped renderer objects
A grouped renderer object _must_ have the following properties:
* type - "range" | "stacked"
* renderAs - an array of single renderer config objects as defined [above](#renderer-objects)

A stacked renderer object _may_ also have:
* stackAxis - "y" (default) or "x"

## Accessors
Accessors are used to tell the visualization about data structure (data accessors), and to determine how the data should be rendered (series accessors).

Accessors must always be functions, and must be exhaustive: if the returned values are dependent on some condition(s), all possible outcomes must be explicitly dealt with.

### Data Accessors
Data accessors are required if the input data does not have the standard 'series' and 'axes' properties.

| Name | Description | Type | Default
| :--- | :--- | :--- | :---
| series | Provides the attribute name for accessing series array from the input data | `(d: Data) => SeriesData` | `d => d.series`
| axes | Provides the attribute name for accessing axes configuration from the input data | `(d: Data) => AxesData` | `d => d.axes`

### Series Accessors
| Name | Description | Type | Default
| :--- | :--- | :--- | :---
| data | Series data | `(d: Object<any>): Datum[]` | `d => d.data`,
| hide | Hide series in chart and legend | `(d: Object<any>): boolean` | `d => d.hide || false`,
| hideInLegend | Hide series in legend only | `(d: Object<any>): boolean` | `d => d.hideInLegend || false`,
| key | Unique series key | `(d: Object<any>): string` | `d => d.key || uniqueId("key")`,
| legendColor | Color to use in legend and default renderer color | `(d: Object<any>): string` | `d => assignColors(d.key)`,
| legendName | Display name to use in legend and focus labels | `(d: Object<any>): string` | `d => d.name || d.key || ""`,
| renderAs | Series rendering options | `(d: Object<any>): RendererOptions<any>[]` | `d => d.renderAs`,
| xAttribute | Datum attribute to plot on x axis | `(d: Object<any>): string` | `d => d.xAttribute || "x"`,
| yAttribute | Datum attribute to plot on y axis | `(d: Object<any>): string` | `d => d.yAttribute || "y"`,
| xAxis | x axis on which to plot series | `(d: Object<any>): "x1" | "x2"` | `d => d.xAxis || "x1"`,
| yAxis | y axis on which to plot series | `(d: Object<any>): "y1" | "y2"` | `d => d.yAxis || "y1"`,

### <a name="renderer-accessors"></a>Renderer-specific accessors
### Area renderer accessors
| Name | Description | Type | Default
| :--- | :--- | :--- | :---
| closeGaps | Interpolate across missing data | `(series, d) => boolean` | `(series, d) => true`
| color | Renderer color | `(series, d) => string` | `(series, d) => series.legendColor()`
| interpolate | Line interpolation | `(series, d) => "cardinal" | "linear" | "monotoneX" | "monotoneY" | "step" | "stepAfter" | "stepBefore"` | `(series, d) => "linear"`

### Bars renderer accessors
| Name | Description | Type | Default
| :--- | :--- | :--- | :---
| barWidth | Width of bars - `undefined` results in automatic sizing | `(series, d) => number` | `(series, d) => undefined`
| color | Renderer color | `(series, d) => string` | `(series, d) => series.legendColor()`

### Line renderer accessors
| Name | Description | Type | Default
| :--- | :--- | :--- | :---
| closeGaps | Interpolate across missing data | `(series, d) => boolean` | `(series, d) => true`
| color | Renderer color | `(series, d) => string` | `(series, d) => series.legendColor()`
| dashed | Toggle line dashing | `(series, d) => boolean` | `(series, d) => false`
| interpolate | Line interpolation | `(series, d) => "cardinal" | "linear" | "monotoneX" | "monotoneY" | "step" | "stepAfter" | "stepBefore"` | `(series, d) => "linear"`

### Symbol renderer accessors
| Name | Description | Type | Default
| :--- | :--- | :--- | :---
| fill | | `(series: Series, d: Datum) => string` | `(series: Series, d: Datum) => "#fff"`
| size | | `(series: Series, d: Datum) => number` | `(series: Series, d: Datum) => 50`
| stroke | | `(series: Series, d: Datum) => string` | `(series: Series, d: Datum) => series.legendColor()`
| symbol | | `(series: Series, d: Datum) => string` | `(series: Series, d: Datum) => "circle"`

Symbol options are: "circle", "cross", "diamond", "square", "squareDiamond", "star", "triangle"

### Text renderer accessors
| Name | Description | Type | Default
| :--- | :--- | :--- | :---
| size | Font size | `(series, d) => number` | `(series, d) => 10`

## Config

| Name | Description | Type | Default
| :--- | :--- | :--- | :---
| duration | Speed at which transitions are animated | number | `1e3`
| flagFocusOffset | Offset of focus label from event flags | number | 15
| focusOffset | Offset of element or date focus label from focus point | number | 5
| focusElement | Key of segment to be manually focussed. | string | undefined
| height | Visualization height | number | 500
| hidden | Hide/show the visualization div | boolean | false
| innerBarSpacing | Padding between bars for same tick in px | number | 2
| innerBarSpacingCategorical | Padding between bars for same categorical tick as a percentage | number | 0.2
| legend | Show/hide legend | boolean | true
| maxBarWidthRatio | Maximum bar width as proportion of total width | number | 1 / 3
| minBarWidth | Minimum bar width | number | 3
| maxFocusLabelWidth | Maximum width of focus labels | number | 350 
| numberFormatter | Number formatter | function | `(x: number): string => x.toString().replace(/B(?=(d{3})+(?!d))/g, ",")`
| outerBarSpacing | Padding between groups of bars | number | 10
| palette | Default color palette | string[] | theme.colors.visualizationPalette
| showComponentFocus | Toggle component focus - if `true`, enables hover and click events on configurable items, in this case series items in legend | boolean | false
| timeAxisPriority | Order of priority of time axes | string[] | ["x1", "x2", "y1", "y2"]
| uid | Unique identifier for the visualization, normally generated automatically from the visualization name | string |
| visualizationName | Name of visualization | string | piechart
| width | Visualization width | number | 500

### <a name="renderer-config"></a>Renderer-specific config
Currently, the only renderer with specific config is the text renderer.

### Text renderer config
| Name | Description | Type | Default
| :--- | :--- | :--- | :---
| offset | Label offset from rendered element | number | 2
| tilt | Toggle label tilting | boolean | depends on orientation of chart