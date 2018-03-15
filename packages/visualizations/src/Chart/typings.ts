import * as d3 from "d3-selection"
import { Accessor, Config, Facade, Focus, Legend, Object, SeriesManager } from "../utils/typings"

export {
  Accessor,
  Accessors,
  EventBus,
  Legend,
  Object,
  State,
  Partial,
  D3Selection,
  SeriesEl,
  StateWriter,
  Canvas
} from "../utils/typings"

export interface XAxisConfig {
  margin: number
  minTicks: number
  noAxisMargin: number
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

export type RendererAccessor<T> = (series: SeriesOptions, d: Datum) => T

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
}

// Series
export interface Datum {
  x?: string | number | Date
  y?: string | number | Date
}

export interface SeriesOptions {
  // Required
  data: Datum[] | SeriesOptions[]
  renderAs: RendererOptions<any>[]
  // Optional
  color?: string
  hide?: boolean // @TODO implement
  hideInLegend?: boolean // @TODO implement
  key?: string
  name?: string
  unit?: string
  xAxis?: "x1" | "x2"
  yAxis?: "y1" | "y2"
}

export type SeriesData = SeriesOptions[]

export type SeriesAccessor<T> = Accessor<SeriesOptions, T>

export interface SeriesAccessors {
  data: SeriesAccessor<Datum[] | SeriesOptions[]>
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
export interface AxisOptions {
  type: "time" | "quant" | "ord"
  validate?: (value: any) => boolean
  extent?: [number, number] // @TODO Should this be replaced with start/end?
}

export interface AxesData {
  x1?: AxisOptions
  x2?: AxisOptions
  y1?: AxisOptions
  y2?: AxisOptions
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

// @TODO
export interface HoverPayload {}

// @TODO
export interface Components {
  // @TODO
  axes: any
  focus: Focus<HoverPayload>
  legend: Legend
}

// @TODO - SingleSeries (class, not interface)
export type SeriesManager = SeriesManager<any>

export type ClipPath = "drawing_clip" | "yrules_clip"

export type SeriesElements = [RendererType, ClipPath][]

export type Facade = Facade<ChartConfig, AccessorsObject, Computed, Components, Data>
