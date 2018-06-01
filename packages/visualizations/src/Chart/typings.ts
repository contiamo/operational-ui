import * as d3 from "d3-selection"
import { Accessor, Config, Facade, Focus, Legend, Object } from "../shared/typings"
import { DateRange } from "moment-range"
export {
  Accessor,
  Accessors,
  ComponentConfigInfo,
  ComponentHoverPayload,
  Dimensions,
  EventBus,
  Legend,
  Object,
  State,
  Partial,
  Point,
  Position,
  D3Selection,
  SeriesEl,
  SeriesManager,
  StateWriter,
  Canvas,
} from "../shared/typings"

export interface XAxisConfig {
  fontSize: number
  margin: number
  minTicks: number
  outerPadding: number
  showRules: boolean
  tickOffset: number
  tickSpacing: number
}

export interface YAxisConfig extends XAxisConfig {
  minTopOffsetTopTick: number
}

export interface AxisConfig extends XAxisConfig {
  minTopOffsetTopTick?: number
}

export type FocusElement = { type: "element" | "date"; value: string | Date }

export interface ChartConfig extends Config {
  flagFocusOffset: number
  focus?: FocusElement
  focusDateOptions: string[]
  focusOffset: number
  innerBarSpacing: number
  innerBarSpacingCategorical: number
  legend: boolean
  maxBarWidthRatio: number
  minBarWidth: number
  numberFormatter: (x: number) => string
  outerBarSpacing: number
  showComponentFocus: boolean
  timeAxisPriority: string[]
}

// Renderers
export type RendererType = "area" | "bars" | "flag" | "line" | "symbol" | "text"

export type RendererAccessor<T> = (series?: any, d?: Datum) => T

export type InterpolationOption =
  | "cardinal"
  | "linear"
  | "monotoneX"
  | "monotoneY"
  | "step"
  | "stepAfter"
  | "stepBefore"

export interface LinearRendererAccessors {
  color: RendererAccessor<string>
  interpolate: RendererAccessor<InterpolationOption>
  closeGaps: RendererAccessor<boolean>
}

export type AreaRendererAccessors = LinearRendererAccessors

export interface BarsRendererAccessors {
  color: RendererAccessor<string>
  barWidth: RendererAccessor<number>
}

export interface FlagRendererAccessors {
  color: RendererAccessor<string>
  description: RendererAccessor<string>
  direction: RendererAccessor<"up" | "down">
  label: RendererAccessor<string>
}

export interface FlagRendererConfig {
  axis: AxisPosition
  axisOffset: number
  axisPadding: number
  flagHeight: number
  flagWidth: number
}

export interface LineRendererAccessors extends LinearRendererAccessors {
  dashed: RendererAccessor<boolean>
}

export type RangeRendererAccessors = LinearRendererAccessors

export interface SymbolRendererAccessors {
  stroke: RendererAccessor<string>
  fill: RendererAccessor<string>
  symbol: RendererAccessor<any>
  size: RendererAccessor<number>
}

export interface TextRendererAccessors {
  size: RendererAccessor<number>
}

export interface TextRendererConfig {
  offset: number
  tilt: boolean
}

export interface SingleRendererOptions<RendererAccessors> {
  type: RendererType
  accessors?: Partial<RendererAccessors>
  config?: Object<any>
}

export interface GroupedRendererOptions {
  type: "range" | "stacked"
  stackAxis?: "x" | "y"
  renderAs: SingleRendererOptions<any>[]
}

export type RendererOptions = SingleRendererOptions<any> | GroupedRendererOptions

export interface RendererClass<RendererAccessors> {
  dataForAxis: (axis: "x" | "y") => any[]
  draw: () => void
  type: RendererType
  update: (data: Datum[], options: SingleRendererOptions<RendererAccessors>) => void
  close: () => void
}

// Series
export interface Datum {
  x?: string | number | Date
  x0?: number
  x1?: number
  y?: string | number | Date
  y0?: number
  y1?: number
  injectedX?: string | number | Date
  injectedY?: string | number | Date
  [key: string]: any
}

export type SeriesData = Object<any>[]

export type SeriesAccessor<T> = Accessor<Object<any>, T>

export interface SeriesAccessors {
  data: SeriesAccessor<Datum[] | Object<any>[]>
  hide: SeriesAccessor<boolean>
  hideInLegend: SeriesAccessor<boolean>
  key: SeriesAccessor<string>
  legendColor: SeriesAccessor<string>
  legendName: SeriesAccessor<string>
  renderAs: SeriesAccessor<RendererOptions[]>
  axis: SeriesAccessor<AxisPosition>
  xAttribute: SeriesAccessor<string>
  yAttribute: SeriesAccessor<string>
  xAxis: SeriesAccessor<"x1" | "x2">
  yAxis: SeriesAccessor<"y1" | "y2">
}

// Axes
export type AxisPosition = "x1" | "x2" | "y1" | "y2"

export type AxisType = "time" | "quant" | "categorical"

export type TimeIntervals = "hour" | "day" | "week" | "month" | "quarter" | "year"

export interface TimeAxisOptions extends AxisConfig {
  type: string
  start: Date
  end: Date
  interval: TimeIntervals
}

export interface QuantAxisOptions extends AxisConfig {
  type: string
  start?: number
  end?: number
  interval?: number
  unit?: string
}

export interface CategoricalAxisOptions extends AxisConfig {
  type: string
  values?: string[]
}

export type AxisOptions = TimeAxisOptions | QuantAxisOptions | CategoricalAxisOptions

export interface AxesData {
  [key: string]: AxisOptions
}

export interface AxisComputed {
  domain?: [number, number] | DateRange
  range: [number, number]
  scale: any
  steps?: [number, number, number]
  tickFormatter?: (d: any) => string
  ticks: any[]
  ticksInDomain?: Date[]
  tickNumber?: number
  tickWidth?: number
}

export interface AxisAttributes {
  dx: number | string
  dy: number | string
  text: any
  x: any
  y: any
}

export interface AxisClass<T> {
  type: "time" | "quant" | "categorical"
  validate: Accessor<any, boolean>
  compute: () => void
  computed: AxisComputed
  computeAligned?: (computed: Object<any>) => void
  computeInitial?: () => Object<any>
  draw: () => void
  interval?: any
  isXAxis: boolean
  previous: AxisComputed
  showRules: boolean
  update: (options: AxisOptions, data: T[]) => void
  close: () => void
}

// Data
export interface Data {
  series?: SeriesData
  axes?: AxesData
}

export interface DataAccessors {
  series: Accessor<Data, SeriesData>
  axes: Accessor<Data, AxesData>
}

export interface AccessorsObject {
  data: DataAccessors
  series: SeriesAccessors
}

// State
export interface Computed {
  axes?: Object<any>
  canvas?: Object<any>
  focus?: Object<any>
  series?: Object<any>
}

// Legend
export interface LegendDatum {
  label: string
  color: string
  key: string
}

export interface DataForLegends {
  top: {
    left: LegendDatum[]
    right: LegendDatum[]
  }
  bottom: {
    left: LegendDatum[]
  }
}

export interface HoverPayload {
  position: string
  element: any
  value: number
  seriesName: string
  seriesColor: string
  offset: number
  focus: {
    x: number
    y: number
  }
}

export type Focus = Focus<HoverPayload>

// @TODO
export interface Components {
  axes: any
  // focus: Focus<HoverPayload>
  legends: Legend
}

export type ClipPath = "drawing_clip" | "yrules_clip" | "xyrules_clip"

export type SeriesElements = [RendererType, ClipPath][]

export type Facade = Facade<ChartConfig, AccessorsObject, Components, Data>

export interface MousePosition {
  x: number
  y: number
}
