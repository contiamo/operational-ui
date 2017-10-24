import EventEmitter from "./event_bus"

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
// @TODO replace with d3-selection typings
export type TSeriesEl = any
