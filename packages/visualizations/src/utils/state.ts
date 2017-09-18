import { cloneDeep } from "lodash"

const getPath = (obj: Object, path: string[]) => {
  return path.reduce((current: any, property: string) => {
    if (current !== null && typeof current === "object") {
      return current[property]
    } else {
      throw new Error(`Path [${path.join(", ")}] not found in object`)
    }
  }, obj)
}

const setPath = (obj: Object, path: string[], value: any) => {
  path.reduce((current: any, property: string, index: number) => {
    if (current !== null && typeof current === "object") {
      if (index === path.length - 1) {
        current[property] = value
      }
      return current[property]
    } else {
      throw new Error(`Path [${path.join(", ")}] not found in object`)
    }
  }, obj)
}

const mergePath = (obj: Object, path: string[], value: Object) => {
  return path.reduce((current: any, property: string, index: number) => {
    if (current !== null && typeof current === "object") {
      if (index === path.length - 1) {
        current[property] = { ...current[property], ...value }
      }
      return current[property]
    } else {
      throw new Error(`Path [${path.join(", ")}] not found in object`)
    }
  }, obj)
}

class State {
  state: Object

  constructor(obj: Object = {}) {
    this.state = cloneDeep(obj)
  }

  get(path: string | string[]): any {
    return getPath(this.state, [].concat(path))
  }

  set(path: string | string[], value: any) {
    return setPath(this.state, [].concat(path), value)
  }

  merge(path: string | string[], value: Object = {}) {
    return mergePath(this.state, [].concat(path), value)
  }

  clone(): State {
    return new State(this.state)
  }
}

export default State
