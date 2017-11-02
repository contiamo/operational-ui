import EventEmitter from "./event_bus"
import * as d3 from "d3-selection"

export interface IKeyValueObject {
  [key: string]: any
}

export interface INestedKeyValueObject {
  [key: string]: IKeyValueObject
}

export interface IDefaultConfig {
  duration: number
  height: number
  uid: string
  visualizationName: string
  width: number
  [key: string]: any
}

export interface IDefaultState {
  data: IKeyValueObject
  config: IDefaultConfig
  accessors: IKeyValueObject,
  computed: {
    series: IKeyValueObject,
    canvas: IKeyValueObject,
  }
}

export interface IState {
  current: any
  previous: any
}

export type TStateWriter = (propertyPath: string | string[], value: any) => void
export type TEvents = EventEmitter
export type TSeriesEl = d3.Selection<Element, any, Window, any>
