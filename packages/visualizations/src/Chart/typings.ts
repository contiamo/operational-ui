import * as d3 from "d3-selection"
import { Accessor, Config, Facade, Focus, Legend, Object } from "../utils/typings"
import { DateRange } from "moment-range"

export {
  Accessor,
  Accessors,
  ComponentConfigOptions,
  ComponentHoverPayload,
  EventBus,
  Legend,
  Object,
  State,
  Partial,
  D3Selection,
  SeriesEl,
  SeriesManager,
  StateWriter,
  Canvas
} from "../utils/typings"

export interface XAxisConfig {
  margin: number
  minTicks: number
  noAxisMargin: number
  outerPadding: number
  tickOffset: number
  tickSpacing: number
}

export interface YAxisConfig extends XAxisConfig {
  minTopOffsetTopTick: number
}

export type FocusElement = string

export interface ChartConfig extends Config {
  axisPaddingForFlags: number
  barLineThickness: number
  barPadding: number
  dateFocusLabelMargin: number
  durationCollapse: number
  durationRedraw: number
  elementFocusLabelMargin: number
  eventFlagAxisOffset: number
  flagHeight: number
  flagWidth: number
  focusElement?: FocusElement
  focusDateOptions: string[]
  focusOnHover: boolean
  legend: boolean
  maxBarWidthRatio: number
  maxLabelWidth: number
  maxLegendRatio: number
  maxLegendWidth: number
  minBarTickWidth: { ord: number }
  minBarWidth: number
  minChartWithLegend: number
  minLegendWidth: number
  numberFormatter: (x: number) => string
  showComponentFocus: boolean
  targetLineColor: string
  textlabels: {
    offset: {
      default: number
      points: number
    }
    rotate: {
      horizontal: number
      vertical: number
    }
  }
  timeAxisPriority: string[]
  x1: XAxisConfig
  x2: XAxisConfig
  y1: YAxisConfig
  y2: YAxisConfig
}

// Renderers
export type RendererType = "area" | "bars" | "flag" | "line" | "range" | "symbol" | "text"

// @TODO SingleSeries / ChartSeries
export type RendererAccessor<T> = (series: any, d: Datum) => T

export interface RendererAxesAccessors {
  x: RendererAccessor<number | string | Date>
  y: RendererAccessor<number | string | Date>
}

export type InterpolationOption =
  | "cardinal"
  | "linear"
  | "monotoneX"
  | "monotoneY"
  | "step"
  | "stepAfter"
  | "stepBefore"

export interface LinearRendererAccessors extends RendererAxesAccessors {
  color: RendererAccessor<string>
  interpolate: RendererAccessor<InterpolationOption>
  closeGaps: RendererAccessor<boolean>
}

export type AreaRendererAccessors = LinearRendererAccessors

export interface BarsRendererAccessors extends RendererAxesAccessors {
  color: RendererAccessor<string>
  minimumBarWidth: RendererAccessor<number>
  barPadding: RendererAccessor<number>
}

export interface FlagRendererAccessors extends RendererAxesAccessors {
  color: RendererAccessor<string>
  size: RendererAccessor<number>
}

export interface LineRendererAccessors extends LinearRendererAccessors {
  dashed: RendererAccessor<number | number[]>
}

export type RangeRendererAccessors = LinearRendererAccessors

export interface SymbolRendererAccessors extends RendererAxesAccessors {
  color: RendererAccessor<string>
  symbol: RendererAccessor<string> // @TODO specify possible strings
  size: RendererAccessor<number>
}

export interface TextRendererAccessors extends RendererAxesAccessors {
  color: RendererAccessor<string>
  size: RendererAccessor<number>
}

export interface RendererOptions<RendererAccessors> {
  type: RendererType | "stacked"
  accessors?: Partial<RendererAccessors>
  renderAs?: RendererOptions<any>[] // Used only in case of type: "stacked"
  stackAxis?: "x" | "y"
}

export interface RendererClass<RendererAccessors> {
  dataForAxis: (axis: "x" | "y") => any[]
  draw: () => void
  type: RendererType
  update: (data: Datum[], options: RendererOptions<RendererAccessors>) => void
}

// Series
export interface Datum {
  x?: string | number | Date
  y?: string | number | Date
  y0?: number
  y1?: number
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
  renderAs: SeriesAccessor<RendererOptions<any>[]>
  unit: SeriesAccessor<string>
  xAxis: SeriesAccessor<"x1" | "x2">
  yAxis: SeriesAccessor<"y1" | "y2">
}

// Axes
export type AxisPosition = "x1" | "x2" | "y1" | "y2"

export interface TimeAxisOptions {
  type: "time"
  start: Date
  end: Date
  interval: "hours" | "days" | "weeks" | "months" | "quarters" | "years"
}

export interface QuantAxisOptions {
  type: "quant"
  start?: number
  end?: number
  interval?: number
}

export interface CategoricalAxisOptions {
  type: "categorical"
  sort?: boolean
}

export type AxisOptions = TimeAxisOptions | QuantAxisOptions | CategoricalAxisOptions

export interface AxesData {
  [key: string]: AxisOptions
}

export interface AxisComputed {
  domain?: [number, number] | DateRange
  range: [number, number]
  scale: any // @TODO typing
  steps?: [number, number, number]
  ticks: any[]
  ticksInDomain?: Date[]
  tickNumber?: number
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
  // @TODO typing
  computeInitial?: () => Object<any>
  draw: () => void
  interval?: any
  isXAxis: boolean
  previous: AxisComputed
  update: (options: AxisOptions, data: T[]) => void
  remove: () => void
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
  axes: Object<any>
  canvas: Object<any>
  focus: Object<any>
  series: Object<any>
}

// Legend
export interface LegendDatum {
  label: string
  color: string
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

// @TODO
export interface HoverPayload {}

// @TODO
export interface Components {
  // @TODO
  axes: any
  focus: Focus<HoverPayload>
  legends: Legend
}

// @TODO - SingleSeries (class, not interface)
// export type SeriesManager = SeriesManager<any>

export type ClipPath = "drawing_clip" | "yrules_clip"

export type SeriesElements = [RendererType, ClipPath][]

export type Facade = Facade<ChartConfig, AccessorsObject, Computed, Components, Data>
