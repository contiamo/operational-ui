import { State, TPath, IReadOnlyState } from "./state"
import { isEmpty } from "lodash/fp"

type Data = Array<any> | Object

interface ChartStateObj {
  data: Data
  config: Object
  accessors: Object
  computed: Object
}

type Partial<T> = { [P in keyof T]?: T[P] }

type ChartState<T> = {
  current: State<T>
  previous: State<T>
}

interface IChartStateReadOnly<T> {
  current: IReadOnlyState<T>
  previous: IReadOnlyState<T>
}

const defaultChartStateObj: ChartStateObj = {
  data: [],
  config: {},
  accessors: {},
  computed: {}
}

class StateHandler {
  state: ChartState<ChartStateObj>

  constructor(obj: Partial<ChartStateObj> = {}) {
    const initial = new State<ChartStateObj>({ ...defaultChartStateObj, ...obj })
    this.state = { current: initial, previous: initial.clone() }
  }

  captureState() {
    this.state.previous = this.state.current.clone()
  }

  readOnly(): IChartStateReadOnly<ChartStateObj> {
    return {
      current: this.state.current.readOnly(),
      previous: this.state.previous.readOnly()
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
  config(config?: Object) {
    if (!arguments.length) return this.state.current.get("config")
    return this.state.current.merge("config", config)
  }

  // Accessors
  accessors(type: string, accessors?: Object) {
    if (!accessors) return this.state.current.get(["accessors", type])
    return this.state.current.merge(["accessors", type], accessors)
  }

  // Computed
  computedWriter(namespace: TPath) {
    return (path: TPath, value: any) => {
      this.state.current.set([].concat(namespace).concat(path), value)
    }
  }
}

export default StateHandler
