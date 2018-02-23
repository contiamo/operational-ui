import { Selection } from "d3-selection"
import { Transition } from "d3-transition"

type d3Selection = Selection<any, any, any, any>
type d3Transition = Transition<any, any, any, any>

export const withD3Element = (func: any) => {
  return function(datum: any, ...args: any[]): any {
    return func(datum, this, ...args)
  }
}

// Only animates transitions if the document can be seen
// N.B. can only be used if no attribute interpolation required
export const transitionIfVisible = (selection: d3Selection, duration: number): d3Selection | d3Transition => {
  return document.hidden ? selection : selection.transition().duration(duration)
}

export const onTransitionEnd = (selection: d3Transition, func: () => void): d3Transition => {
  let n: number = 0
  return selection.each(() => (n = n + 1)).on("end", (): void => {
    n = n - 1
    if (n < 1) {
      func()
    }
  })
}
