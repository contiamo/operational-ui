import State, { ReadOnlyState, Path } from "./state"
import { Accessor, Accessors, ChartStateObject } from "./typings"
import { forEach, isEmpty, reduce } from "lodash/fp"

export interface ChartState<T> {
  current: State<T>
  previous: State<T>
}

export interface ChartStateReadOnly<T> {
  current: ReadOnlyState<T>
  previous: ReadOnlyState<T>
}

export type StateWriter = (propertyPath: string | string[], value: any) => void

export default class StateHandler<Config, Data> {
  state: ChartState<ChartStateObject>

  constructor(obj: ChartStateObject) {
    const initial = new State<ChartStateObject>(obj)
    this.state = { current: initial, previous: initial.clone() }
  }

  captureState() {
    this.state.previous.set(["computed"], this.state.current.clone().get("computed"))
  }

  readOnly(): ChartStateReadOnly<ChartStateObject> {
    return {
      current: this.state.current.readOnly(),
      previous: this.state.previous.readOnly(),
    }
  }

  // Data
  data(data?: Data) {
    if (!arguments.length) return this.state.current.get("data")
    return this.state.current.set("data", data)
  }

  hasData(): boolean {
    return isEmpty(this.data())
  }

  // Config
  config(config?: Partial<Config>): Config {
    if (!arguments.length) return this.state.current.get("config")

    const invalidOptions: string[] = reduce.convert({ cap: false })(
      (memo: string[], value: any, key: string): string[] => {
        if (!value && value !== false) {
          memo.push(key)
        }
        return memo
      },
      [],
    )(config)
    forEach(
      (option: string): void => {
        console.warn(`Warning: invalid config option '${option}: reverting to default.`)
      },
    )(invalidOptions)

    return this.state.current.merge("config", config)
  }

  // Accessors
  accessors(type: string, accessors?: Accessors<any>) {
    if (!accessors) return this.state.current.get(["accessors", type])
    const accessorFuncs: Accessors<any> = reduce.convert({ cap: false })(
      (memo: Accessors<any>, accessor: Accessor<any, any>, key: string) => {
        memo[key] = typeof accessor === "function" ? accessor : () => accessor
        return memo
      },
      {},
    )(accessors)
    return this.state.current.merge(["accessors", type], accessorFuncs)
  }

  // Computed
  computedWriter(namespace: Path): StateWriter {
    return (path: Path, value: any): void => {
      this.state.current.set(["computed"].concat(namespace).concat(path), value)
    }
  }
}
