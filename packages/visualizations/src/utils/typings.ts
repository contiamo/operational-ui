import EventEmitter from "./event_bus"

interface TState {
  current: any
  previous: any
}

type TStateWriter = (propertyPath: string | string[], value: any) => void
type TEvents = EventEmitter
// @TODO replace with d3-selection typings
type TSeriesEl = any

export { TState, TStateWriter, TEvents, TSeriesEl }
