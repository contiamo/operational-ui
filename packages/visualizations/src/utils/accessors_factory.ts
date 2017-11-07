import { reduce, forEach } from "lodash/fp"
import { IObject } from "./typings"

type AccessorFunction = (node: any) => any

let AccessorsFactory: any = (defaultAccessors: IObject) => {
  function wrapWithDefaultAccessor(customAccessor: AccessorFunction, defaultAccessor: AccessorFunction) {
    return (node: any) => customAccessor(node) || defaultAccessor(node)
  }

  return class Accessors {
    accessors: IObject
    customAccessors: IObject

    constructor() {
      this.resetAccessors()
      this.accessors = this.buildAccessors()
    }

    resetAccessors(): void {
      this.customAccessors = {}
    }

    setAccessors(accessors: IObject): void {
      forEach.convert({ cap: false })(
        (method: AccessorFunction, property: string): void => {
          this.customAccessors[property] = method
        }
      )(accessors)
    }

    propertyAccessor(property: string): AccessorFunction {
      return (node: any): AccessorFunction => {
        const customAccessor: AccessorFunction = this.customAccessors[property],
          defaultAccessor: AccessorFunction = defaultAccessors[property]
        return customAccessor ? wrapWithDefaultAccessor(customAccessor, defaultAccessor)(node) : defaultAccessor(node)
      }
    }

    buildAccessors(): IObject {
      return reduce.convert({ cap: false })(
        (memo: IObject, defaultAccessor: AccessorFunction, property: string): IObject => {
          memo[property] = this.propertyAccessor(property)
          return memo
        }
      , {})(defaultAccessors)
    }
  }
}

export default AccessorsFactory
