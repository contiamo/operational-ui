// Type definitions for the Contiamo Sunburst visualization
import Breadcrumb from "./breadcrumb"
import Renderer from "./renderer"
import RootLabel from "./root_label"
import * as d3 from "d3-selection"

import { IObject, Focus } from "../utils/typings"

export {
  IChartStateObject,
  IEvents,
  IObject,
  IState,
  Partial,
  TD3Selection,
  TSeriesEl,
  TStateWriter
} from "../utils/typings"

export interface IConfig {
  arrowOffset: number
  centerCircleRadius: number
  disableAnimations: boolean
  duration: number
  height: number
  hidden: boolean
  maxRings: number
  numberFormatter: (x: number) => string
  outerBorderMargin: number
  palette: string[]
  propagateColors: boolean
  sort: boolean
  uid: string
  visualizationName: string
  width: number
  zoomNode?: IObject
}

export type TDatum = IObject

export interface IAccessors {
  data: {
    data: (d: IObject) => IObject
  }
  series: {
    color: (d: TDatum) => string
    name: (d: TDatum) => string
    value: (d: TDatum) => number
  }
}

export interface IComputedState {
  canvas: IObject
  focus: IObject
  renderer: IObject
}

export interface IMousePosition {
  absolute: { x: number; y: number }
  relative: { x: number; y: number }
}

export type Focus = Focus<IObject, TDatum>

export interface Components {
  breadcrumb: Breadcrumb
  focus: Focus<IObject, TDatum>
  renderer: Renderer
  rootLabel: RootLabel
}
