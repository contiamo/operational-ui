// Type definitions for the Contiamo Process Flow visualization
import * as d3 from "d3-selection"

import {
  IChartStateObject,
  IEvents,
  IObject,
  IState,
  Partial,
  TD3Selection,
  TSeriesEl,
  TStateWriter
} from "../utils/typings"

export { IChartStateObject, IEvents, IObject, IState, Partial, TD3Selection, TSeriesEl, TStateWriter }

export interface IConfig {
  arrowMarkerSize: number
  centerCircleRadius: number
  duration: number
  height: number
  hidden: boolean
  maxRings: number
  numberFormatter: (x: number) => string
  outerBorderMargin: number
  propagateColors: boolean
  suppressAnimation: boolean
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
