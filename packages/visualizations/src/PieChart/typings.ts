// Type definitions for the Contiamo Process Flow visualization
import * as d3 from "d3-selection"

import {
  IAccessors,
  IChartStateObject,
  IEvents,
  IObject,
  IState,
  Partial,
  TD3Selection,
  TSeriesEl,
  TStateWriter
} from "../utils/typings"

export { IAccessors, IChartStateObject, IEvents, IObject, IState, Partial, TD3Selection, TSeriesEl, TStateWriter }

export type TFocusElement = string

export interface IConfig {
  colors: IObject
  duration: number
  focusElement?: TFocusElement
  // gaugeExtent: "semi"
  height: number
  hidden: boolean
  legend: true
  maxDonutWidth: number
  maxGaugeWidth: number
  maxLegendRatio: number
  maxLegendWidth: number
  maxTotalFontSize: number
  minChartWithLegend: number
  minDonutWidth: number
  minInnerRadius: number
  minLegendWidth: number
  minPolarSegmentWidth: number
  minTotalFontSize: number
  numberFormatter: (x: number) => string
  outerBorderMargin: number
  // renderer: "pie-chart"
  showComponentFocus: boolean
  uid: string
  visualizationName: string
  width: number
}

export interface IAccessorsObject {
  data: {
    data: (d: any) => any
  }
  series: {
    comparison: (d: any) => any
    data: (d: any) => any
    name: (d: any) => string
    renderAs: (d: any) => any
    target: (d: any) => any
  }
}

export interface IComputedState {
  canvas: IObject
  focus: IObject
  series: IObject
}

export type TData = [string, number][]
