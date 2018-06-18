// Type definitions for the Contiamo Process Flow visualization
import * as d3 from "d3-selection"
import { Arc, Pie, PieArcDatum } from "d3-shape"
import { Accessor, Config, Facade, Focus, Legend, State } from "../shared/typings"

export {
  Accessor,
  Accessors,
  Canvas,
  ComponentConfigInfo,
  ComponentHoverPayload,
  D3Selection,
  Dimensions,
  EventBus,
  Legend,
  Point,
  Position,
  State,
  StateWriter,
} from "../shared/typings"

export type FocusElement = string

export interface PieChartConfig extends Config {
  displayPercentages: boolean
  focusElement?: FocusElement
  focusOffset: number
  legend: true
  maxWidth: number
  maxLegendRatio: number
  maxLegendWidth: number
  maxTotalFontSize: number
  minChartWithLegend: number
  minWidth: number
  minInnerRadius: number
  minLegendWidth: number
  minTotalFontSize: number
  outerBorderMargin: number
  palette: string[]
  showComponentFocus: boolean
}

export type Datum = {
  value?: number
  key?: string
  percentage?: number
  unfilled?: boolean
}

export type Data = Datum[]

export interface LegendDatum {
  label: string
  color?: string
  comparison?: boolean
}

export interface DataAccessors {
  data: Accessor<any, Data>
}

export interface SeriesAccessors {
  name: Accessor<Datum, string>
  renderAs: Accessor<Datum, any>
}

export interface AccessorsObject {
  data: DataAccessors
  series: SeriesAccessors
}

export type RendererAccessor<T> = Accessor<Datum | ComputedDatum, T>

export interface RendererAccessors {
  key: RendererAccessor<string>
  value: RendererAccessor<number>
  color: RendererAccessor<string>
}

export interface Computed {
  canvas: { [key: string]: any }
  focus: { [key: string]: any }
  series: { [key: string]: any }
}

export interface DatumInfo {
  key: string
  value: number
  percentage: number
}

export interface HoverPayload {
  focusPoint: { centroid: [number, number] }
  d: DatumInfo
}

export type Focus = Focus<HoverPayload>

export interface Components {
  focus: Focus<HoverPayload>
  legend: Legend
}

export type Facade = Facade<PieChartConfig, AccessorsObject, Components, Data>

export interface RendererOptions {
  type: "donut" | "polar" | "gauge"
  accessors?: { [key: string]: Accessor<Datum, any> }
  extent?: "semi" | "full"
  comparison?: Datum
  target?: number
}

export interface ComputedInitial {
  layout: Pie<any, any>
  total: number
  target?: number
}

export interface ComputedArcs {
  arc: Arc<any, any>
  arcOver: Arc<any, any>
  rInner: any
  rInnerHover: any
  r: any
  rHover: any
}

export type ComputedDatum = PieArcDatum<Datum>

export interface ComputedData extends ComputedInitial, ComputedArcs {
  comparison?: Datum
  data: ComputedDatum[]
}

export interface Renderer {
  dataForLegend: () => LegendDatum[]
  draw: () => void
  key: Accessor<Datum | ComputedDatum, string>
  remove: () => void
  setData: (data: Datum[]) => void
  state: State
  type: "donut" | "gauge" | "polar"
  updateOptions: (options: { [key: string]: any }) => void
  value: Accessor<Datum | ComputedDatum, number>
}
