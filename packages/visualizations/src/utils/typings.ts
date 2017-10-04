import EventEmitter from "./event_bus"

interface TState {
  current: any
  previous: any
}

type TStateWriter = (propertyPath: string | string[], value: any) => void
type TEvents = EventEmitter

export { TState, TStateWriter, TEvents }
