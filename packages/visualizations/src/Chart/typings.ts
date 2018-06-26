import { Accessor, Config, Facade, Focus, Legend } from "../shared/typings"
import { DateRange } from "moment-range"

export {
  Accessor,
  Accessors,
  ComponentConfigInfo,
  ComponentHoverPayload,
  Dimensions,
  EventBus,
  Legend,
  State,
  Point,
  Position,
  D3Selection,
  StateWriter,
  Canvas,
} from "../shared/typings"

export interface AxisConfig {
  fontSize: number
  margin: number
  minTicks: number
  outerPadding: number
  rotateLabels: boolean
  showRules: boolean
  showTicks: boolean
  tickOffset: number
  tickSpacing: number
  title: string
  titleFontSize: number
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

export interface SeriesManager {
  assignData: () => void
  draw: () => void
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
  opacity: RendererAccessor<number>
}

export type AreaRendererAccessors = LinearRendererAccessors

export interface BarsRendererAccessors {
  barWidth: RendererAccessor<number>
  color: RendererAccessor<string>
  focusContent: RendererAccessor<any>
  opacity: RendererAccessor<number>
}

export interface FlagRendererAccessors {
  color: RendererAccessor<string>
  description: RendererAccessor<string>
  direction: RendererAccessor<"up" | "down">
  label: RendererAccessor<string>
  opacity: RendererAccessor<number>
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
  focusContent: RendererAccessor<any>
  symbol: RendererAccessor<any>
  size: RendererAccessor<number>
  opacity: RendererAccessor<number>
}

export interface TextRendererAccessors {
  size: RendererAccessor<number>
  opacity: RendererAccessor<number>
}

export interface TextRendererConfig {
  offset: number
  tilt: boolean
}

export interface SingleRendererOptions<RendererAccessors> {
  type: RendererType
  accessors?: Partial<RendererAccessors>
  config?: { [key: string]: any }
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

export type SeriesData = { [key: string]: any }[]

export type SeriesAccessor<T> = Accessor<{ [key: string]: any }, T>

export interface SeriesAccessors {
  data: SeriesAccessor<Datum[] | { [key: string]: any }[]>
  hide: SeriesAccessor<boolean>
  hideInLegend: SeriesAccessor<boolean>
  key: SeriesAccessor<string>
  legendColor: SeriesAccessor<string>
  legendName: SeriesAccessor<string>
  renderAs: SeriesAccessor<RendererOptions[]>
  axis: SeriesAccessor<AxisPosition>
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
  ruleInterval?: number
  tickInterval: number
  unit?: string
}

export interface CategoricalAxisOptions extends AxisConfig {
  type: string
  values?: string[]
}

export type AxisOptions = TimeAxisOptions | QuantAxisOptions | CategoricalAxisOptions

export interface AxesData {
  [key: string]: Partial<AxisOptions>
}

export interface AxisComputed {
  domain?: [number, number] | DateRange
  labelSteps?: [number, number, number]
  labelTicks?: any[]
  range: [number, number]
  ruleSteps?: [number, number, number]
  ruleTicks?: any[]
  ruleOffset?: number
  scale: any
  tickSteps?: [number, number, number]
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
  computeAligned?: (computed: { [key: string]: any }) => void
  computeInitial?: () => { [key: string]: any }
  draw: (duration?: number) => void
  interval?: any
  isXAxis: boolean
  options: AxisOptions
  previous: AxisComputed
  update: (options: Partial<AxisOptions>, data: T[]) => void
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
  axes?: { [key: string]: any }
  canvas?: { [key: string]: any }
  focus?: { [key: string]: any }
  series?: { [key: string]: any }
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
  content: { name: string; value: any }[]
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
