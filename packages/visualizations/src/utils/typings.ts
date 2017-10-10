import EventEmitter from "./event_bus"

export interface TState {
  current: any
  previous: any
}

export type TStateWriter = (propertyPath: string | string[], value: any) => void
export type TEvents = EventEmitter
// @TODO replace with d3-selection typings
export type TSeriesEl = any
