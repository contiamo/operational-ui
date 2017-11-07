export const withD3Element = (func: any) => {
  return function(datum: any, ...args: any[]): void {
    func(datum, this, ...args)
  }
}

