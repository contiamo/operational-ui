export const withD3Element = (func: any) => {
  return function(datum: any, ...args: any[]): any {
    return func(datum, this, ...args)
  }
}
