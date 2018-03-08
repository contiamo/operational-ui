import { Selection } from "d3-selection"
import { Transition } from "d3-transition"
import { D3Selection, D3Transition } from "./typings"

export const withD3Element = (func: any) => {
  return function(datum: any, ...args: any[]): any {
    return func(datum, this, ...args)
  }
}

// Only animates transitions if the document can be seen
// N.B. can only be used if no attribute interpolation required
export const transitionIfVisible = (selection: D3Selection, duration: number): D3Selection | D3Transition => {
  return document.hidden ? selection : selection.transition().duration(duration)
}

export const onTransitionEnd = (selection: D3Transition, func: () => void): D3Transition => {
  let n: number = 0
  return selection.each(() => (n = n + 1)).on("end", (): void => {
    n = n - 1
    if (n < 1) {
      func()
    }
  })
}
