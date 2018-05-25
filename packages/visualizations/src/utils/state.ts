import { cloneDeep } from "lodash"
import { defaults } from "lodash/fp"

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
    return this.getPath([].concat(path))
  }

  set(path: Path, value: any) {
    return this.setPath([].concat(path), value)
  }

  merge(path: Path, value: Object = {}) {
    return this.mergePath([].concat(path), value)
  }

  readOnly(): ReadOnlyState<T> {
    return { get: this.get }
  }

  clone(): State<T> {
    // State object will be deep-cloned in constructor
    return new State<T>(this.state)
  }

  private getPath(path: string[]) {
    return path.reduce((currentStateChunk: any, currentPath: string) => {
      if (currentStateChunk !== null && typeof currentStateChunk === "object") {
        return currentStateChunk[currentPath]
      }
      throw new Error(`Path [${path.join(", ")}] not found in object`)
    }, this.state)
  }

  private setPath(path: string[], value: any) {
    path.reduce((currentStateChunk: any, currentPath: string, index: number) => {
      if (currentStateChunk !== null && typeof currentStateChunk === "object") {
        if (index === path.length - 1) {
          currentStateChunk[currentPath] = value
        }
        return currentStateChunk[currentPath]
      }
      throw new Error(`Path [${path.join(", ")}] not found in object`)
    }, this.state)
  }

  private mergePath(path: string[], value: Object) {
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
