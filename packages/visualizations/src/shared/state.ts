import { cloneDeep } from "lodash"
import { defaults, get, set } from "lodash/fp"

export type Path = string | string[]

export interface ReadOnlyState<T> {
  get(path: Path): any
}

export default class State<T> {
  state: T

  constructor(obj: T) {
    this.state = cloneDeep(obj)
  }

  get = (path: Path): any => {
    return get([].concat((Array.isArray(path) && path) || [path]))(this.state)
  }

  set(path: Path, value: any) {
    this.state = set(path)(value)(this.state)
  }

  merge(path: Path, value: { [key: string]: any } = {}) {
    return this.mergePath([].concat(path), value)
  }

  readOnly(): ReadOnlyState<T> {
    return { get: this.get }
  }

  clone(): State<T> {
    // State object will be deep-cloned in constructor
    return new State<T>(this.state)
  }

  private mergePath(path: string[], value: { [key: string]: any }) {
    return path.reduce((currentStateChunk: any, currentPath: string, index: number) => {
      if (currentStateChunk !== null && typeof currentStateChunk === "object") {
        if (index === path.length - 1) {
          currentStateChunk[currentPath] = defaults(currentStateChunk[currentPath])(value)
        }
        return currentStateChunk[currentPath]
      }
      throw new Error(`Path [${path.join(", ")}] not found in object`)
    }, this.state)
  }
}
