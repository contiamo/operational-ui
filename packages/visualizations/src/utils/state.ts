import { cloneDeep } from "lodash"

export type TPath = string | string[]

export interface IReadOnlyState<T> {
  get(path: TPath): any
}

export class State<T> {
  state: T

  constructor(obj: T) {
    this.state = cloneDeep(obj)
  }

  get(path: TPath): any {
    return this.getPath([].concat(path))
  }

  set(path: TPath, value: any) {
    return this.setPath([].concat(path), value)
  }

  merge(path: TPath, value: Object = {}) {
    return this.mergePath([].concat(path), value)
  }

  readOnly(): IReadOnlyState<T> {
    return {
      get: this.get.bind(this)
    }
  }

  clone(): State<T> {
    // State object will be deep-cloned in constructor
    return new State<T>(this.state)
  }

  private getPath(path: string[]) {
    return path.reduce((current: any, property: string) => {
      if (current !== null && typeof current === "object") {
        return current[property]
      } else {
        throw new Error(`Path [${path.join(", ")}] not found in object`)
      }
    }, this.state)
  }

  private setPath(path: string[], value: any) {
    path.reduce((current: any, property: string, index: number) => {
      if (current !== null && typeof current === "object") {
        if (index === path.length - 1) {
          current[property] = value
        }
        return current[property]
      } else {
        throw new Error(`Path [${path.join(", ")}] not found in object`)
      }
    }, this.state)
  }

  private mergePath(path: string[], value: Object) {
    return path.reduce((current: any, property: string, index: number) => {
      if (current !== null && typeof current === "object") {
        if (index === path.length - 1) {
          current[property] = { ...current[property], ...value }
        }
        return current[property]
      } else {
        throw new Error(`Path [${path.join(", ")}] not found in object`)
      }
    }, this.state)
  }
}
