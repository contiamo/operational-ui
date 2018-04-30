/*
 * Modifies a d3 event handler function to include the d3 element
 * from context as a second argument, passing any remaining ones
 * from the spread.
 */
export const handleWithD3Element = (handler: (datum: {}, context: any, ...rest: any[]) => {}): {} => {
  return function(datum: {}, ...args: any[]) {
    handler(datum, this, ...args)
  }
}
