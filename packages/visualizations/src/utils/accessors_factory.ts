import { reduce, bind, forEach } from "lodash/fp"
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
        bind(function(method: AccessorFunction, property: string): void {
          this.customAccessors[property] = method
        }, this),
      )(accessors)
    }

    propertyAccessor(property: string): AccessorFunction {
      return bind(function(node: any): AccessorFunction {
        let customAccessor: AccessorFunction = this.customAccessors[property],
          defaultAccessor: AccessorFunction = defaultAccessors[property]
        return customAccessor ? wrapWithDefaultAccessor(customAccessor, defaultAccessor)(node) : defaultAccessor(node)
      }, this)
    }

    buildAccessors(): IObject {
      return reduce.convert({ cap: false })(
        bind(function(memo: any, defaultAccessor: AccessorFunction, property: string): any {
          memo[property] = this.propertyAccessor(property)
          return memo
        }, this),
        {},
      )(defaultAccessors)
    }
  }
}

export default AccessorsFactory
