import State from "./state"
import { isEmpty } from "lodash/fp"

type ChartState = {
  current: State
  previous: State
}

class StateHandler {
  state: ChartState

  constructor(obj: Object = {}) {
    const initial = new State(obj)
    this.state = { current: initial, previous: initial.clone() }
  }

  captureState() {
    this.state.previous = this.state.current.clone()
  }

  data(data?: Array<any> | Object) {
    if (!arguments.length) return this.state.current.get("data")
    return this.state.current.set("data", data)
  }

  config(config?: Object) {
    if (!arguments.length) return this.state.current.get("config")
    return this.state.current.merge("config", config)
  }

  accessors(type: string, accessors?: Object) {
    if (!accessors) return this.state.current.get(["accessors", type])
    return this.state.current.merge(["accessors", type], accessors)
  }

  computed(path: string | string[]) {
    return this.state.current.get(["computed"].concat(path))
  }

  hasData(): boolean {
    return isEmpty(this.data())
  }

  readOnly(): any {
    return {
      current: this.state.current.state,
      previous: this.state.previous.state,
    }
  }

  private setComputed(path: string | string[], value?: any) {
    return this.state.current.set(["computed"].concat(path), value)
  }

  writer(path: string[]) {
    return (propertyPath: string | string[], value: any): void => {
      const fullPath = path.concat(propertyPath)
      this.setComputed(propertyPath, value)
    }
  }
}

export default StateHandler
