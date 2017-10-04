import { reduce, bind, forEach } from "lodash/fp"

type AccessorFunction = (node: any) => any

let AccessorsFactory: any = (defaultAccessors: any) => {
  const wrapWithDefaultAccessor: (a: AccessorFunction, b: AccessorFunction) => AccessorFunction = function(
    customAccessor: AccessorFunction,
    defaultAccessor: AccessorFunction,
  ) {
    return function(node: any) {
      return customAccessor(node) || defaultAccessor(node)
    }
  }

  return class Accessors {
    accessors: Object
    customAccessors: Object

    constructor() {
      this.resetAccessors()
      this.accessors = this.buildAccessors()
    }

    resetAccessors(): void {
      this.customAccessors = {}
    }

    setAccessors(accessors: any): void {
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

    buildAccessors(): Object {
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
