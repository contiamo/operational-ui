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
  duration: number
  height: number
  hidden: boolean
  numberFormatter: (x: number) => string
  outerBorderMargin: number
  uid: string
  visualizationName: string
  width: number
  zoomNode?: IObject
}

export type TDatum = IObject

export interface IAccessors {
  series: {
    children: (d: TDatum) => IObject[]
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
