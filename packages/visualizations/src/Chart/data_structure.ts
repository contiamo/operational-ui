// // Chart default accessors
// const defaultSeriesAccesors = {
// 	data: (series) => series.data,
// 	xAxis: (series) => series.xAxis,
// 	yAxis: (series) => series.yAxis,
// 	legendName: (series) => series.name,
//   legendColor: (series) => series.color,
//   hideInLegend: (series) => series.hideInLegend || false,
// 	key: (series) => series.key || uniqueId(),
// 	unit: (series) => series.unit || "",
// 	formatter: (series) => series.formatter || String, // @TODO ????
// 	renderAs: (series) => series.renderAs
// }

// // Default axes accessors for renderers -  by default, expect each data point to be an object
// const defaultRendererAxesAccessors = {
// 	x: (d) => d.x,
// 	y: (d) => d.y,
// }

// // Renderer default accessors
// const defaultLineRendererAccessors = {
// 	...defaultRendererAxesAccessors,
//   type: "line",
// 	color: (series, d) => series.color,
// 	dashed: (series, d) => series.dashed || 0,
// 	interpolate: (series, d) => series.interpolate || "monotone",
// 	closeGaps: (series, d) => series.closeGaps || false,
// }

// const defaultSymbolRendererAccessors = {
// 	...defaultRendererAxesAccessors,
//   type: "symbol",
// 	color: (series, d) => series.color,
// 	symbol: (series, d) => "circle",
// 	size: (series, d) => d.size
// }

// const defaultAreaRendererAccessors = {
// 	...defaultRendererAxesAccessors,
//   type: "area",
// 	color: (series, d) => series.color,
// 	interpolate: (series, d) => "monotone",
// 	closeGaps: (series, d) => false,
// }

// const defaultBarsRendererAccessors = {
// 	...defaultRendererAxesAccessors,
//   type: "bars",
// 	color: (series, d) => series.color,
// 	minimumBarWidth: (series, d) => series.barWidth,
// 	barPadding: (series, d) => series.barPadding,
// }

// const defaultRangeRendererAccessors = {
// 	...defaultRendererAxesAccessors,
//   type: "range",
// 	color: (series, d) => series.color, // Is it possible to have 2 colours?
// 	interpolate: (series, d) => "monotone",
// 	closeGaps: (series, d) => false,
// }

// const defaultTextRendererAccessors = {
// 	...defaultRendererAxesAccessors,
//   type: "text",
// 	color: (series, d) => series.color,
// 	size: (series, d) => d.size
// }

// const defaultFlagsRendererAccessors = {
// 	...defaultRendererAxesAccessors,
//   type: "flags",
// 	color: (series, d) => series.color,
// 	size: (series, d) => d.size
// }

// // Axes logic
// const TimeAxis = {
//   validate: (value) => _.isDate(value), // Time axis only supports dates
//   extent: () => {
//     // UNLESS explicitly defined in the axis config:
//     // 1. Ask all series for their required extent for this axis
//     // 2. Series will ask all renderers for their required extent for this axis
//     // 3. Compute the maximum required extent
//   }
// }

// const QuantAxis = {
//   validate: (value) => _.isFinite(value), // Quant axis only supports finite numbers
//   extent: () => {
//     // UNLESS explicitly defined in the axis config:
//     // 1. Ask all series for their required extent for this axis
//     // 2. Series will ask all renderers for their required extent for this axis
//     // 3. Compute the maximum required extent
//   }
// }

// const CatAxis = {
//   validate: (value) => !_.isNil(value), // Categorical axis supports everything that supports ".toString()"
//   extent: () => {
//     // UNLESS explicitly defined in the axis config:
//     // 1. Ask all series for their required extent for this axis.
//     // 2. Series will ask all renderers for their required extent for this axis
//     // 3. Compute the full required extent (all values)
//   }
// }

// // Compute phase logic
// // This would live in the axes
// const warn = (validator, msg) => (value) => validator(value) : true : console.warn(`${msg}: ${value}`) && false
// const timeAxisFilter = warn(TimeAxis.validate, "Not a valid Date for TimeAxis")
// const quantAxisFilter = warn(QuantAxis.validate, "Not a valid Date for QuantAxis")
// // The renderer somehow needs access to the axis data filters...
// // This would live in the renderers
// const xAxisFilter = flow([rendererAccessors.x, timeAxisFilter])
// const yAxisFilter = flow([rendererAccessors.y, timeAxisFilter])
// const rendererDataFilter = overEvery([xAxisFilter, yAxisFilter])
// // We need to store this on the renderer and only use this data drawing
// const dataForRenderer = rendererDataFilter(data)

// /*********************
//  Example use
// *********************/
// const LineRenderer = {
//   type: "line"
// }

// const StackedRenderer = {
// 	type: "stacked",
// 	renderAs: [LineRenderer]
// }

// const state = {
//   data: {
//     series: [
//     	{
//     	  data: [
//           {x: new Date("March 10, 2018"), y: 100}
//           {x: new Date("March 11, 2018"), y: 200}
//           {x: new Date("March 12, 2018"), y: 300}
//           {x: new Date("March 13, 2018"), y: 400}
//           {x: new Date("March 14, 2018"), y: 500}
//         ],
//     	  name: "my series",
//     	  key: "unique_key",
//      	  renderAs: [LineRenderer]
//     	},
//     	{
//     	  data: [
//           {
//             data: [
//               {x: new Date("March 10, 2018"), y: 100}
//               {x: new Date("March 11, 2018"), y: 200}
//               {x: new Date("March 12, 2018"), y: 300}
//               {x: new Date("March 13, 2018"), y: 400}
//               {x: new Date("March 14, 2018"), y: 500}
//             ],
//             name: "series1",
//             key: "series1"
//           },
//           {
//             data: [
//               {x: new Date("March 10, 2018"), y: 10}
//               {x: new Date("March 11, 2018"), y: 20}
//               {x: new Date("March 12, 2018"), y: 30}
//               {x: new Date("March 13, 2018"), y: 40}
//               {x: new Date("March 14, 2018"), y: 50}
//             ],
//             name: "series2",
//             key: "series2"
//           }
//         ],
//     	  name: "my series",
//     	  key: "unique_key",
//      	  renderAs: [StackedRenderer]  // Similar concept for range renderer, but data.length === 2
//     	}
//     ],
//     axes: {
//       x1: {
//         type: "time"
//       },
//       y1: {
//         type: "quant"
//       }
//     }
//   }
// }
