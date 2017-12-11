import EventEmitter from "./event_bus"
import { IChartStateReadOnly } from "./state_handler"
import * as d3 from "d3-selection"

export type Partial<T> = { [P in keyof T]?: T[P] }

export interface IObject {
  [key: string]: any
}

export type TStateWriter = (propertyPath: string | string[], value: any) => void

export type TSeriesEl = d3.Selection<Element, any, Window, any>

export type TD3Selection = d3.Selection<any, any, any, any>

export interface IAccessors {
  [key: string]: (d: any) => any
}

export type IEvents = EventEmitter

export type Datum = {}

export interface IChartStateObject {
  data: Datum[] | IObject
  config: IObject
  accessors: any
  computed: IObject
}

export type IState = IChartStateReadOnly<IChartStateObject>
