interface TState {
  current: any
  previous: any
}

type TStateWriter = (propertyPath: string | string[], value: any) => void

export { TState, TStateWriter }
