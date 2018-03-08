// Type definitions for the Contiamo Process Flow visualization
import * as d3 from "d3-selection"
import { Arc, Pie, PieArcDatum } from "d3-shape"
import { Accessor, Config, Object, Focus, Legend, Facade } from "../utils/typings"

export {
  Accessor,
  Accessors,
  Canvas,
  ComponentConfigOptions,
  D3Selection,
  EventBus,
  Legend,
  Object,
  Partial,
  SeriesEl,
  State,
  StateWriter
} from "../utils/typings"

export type FocusElement = string

export interface PieChartConfig extends Config {
  focusElement?: FocusElement
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
  numberFormatter: (x: number) => string
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

export interface RendererAccessors {
  key: Accessor<Datum | ComputedDatum, string>
  value: Accessor<Datum | ComputedDatum, number>
  color: Accessor<Datum | ComputedDatum, string>
}

export interface Computed {
  canvas: Object<any>
  focus: Object<any>
  series: Object<any>
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

export type Facade = Facade<PieChartConfig, AccessorsObject, Computed, Components, Data>

export interface RendererOptions {
  type: "donut" | "polar" | "gauge"
  accessors?: Object<Accessor<Datum, any>>
  extent?: "semi" | "full"
  comparison?: {
    id: string
    size: number
  }
  target?: number
}

export interface ComputedInitial {
  layout: Pie<any, any>
  total: number
}

export interface ComputedArcs {
  arc: Arc<any, any>
  arcOver: Arc<any, any>
  inner: number
  innerHover: number
  r: number
  rHover: number
}

export type ComputedDatum = PieArcDatum<Datum>

export interface ComputedData extends ComputedInitial, ComputedArcs {
  comparison?: any
  data: ComputedDatum[]
}
