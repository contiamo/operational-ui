import { Selection } from "d3-selection"
import { Transition } from "d3-transition"
import { D3Selection, D3Transition, Object } from "./typings"
import { isFunction } from "lodash/fp"

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

export const onTransitionEnd = (selection: D3Transition, func?: () => void): D3Transition => {
  if (!func) {
    return
  }
  if (selection.empty()) {
    func()
    return
  }
  let n: number = 0
  return selection.each(() => (n = n + 1)).on("end", (): void => {
    n = n - 1
    if (n < 1) {
      func()
    }
  })
}

const transitionOrSelection = (selection: D3Selection | D3Transition, duration?: number): any => {
  return duration != null ? selection.transition().duration(duration) : selection
}

export const setPathAttributes = (
  selection: D3Selection | D3Transition,
  attributes: Object<any>,
  duration?: number,
  onEnd?: () => void
): void => {
  const elements = duration
    ? transitionOrSelection(selection, duration).attrTween("d", attributes.path)
    : transitionOrSelection(selection).attr("d", attributes.path)

  elements
    .style("fill", attributes.fill)
    .style("stroke", attributes.stroke)
    .style("opacity", attributes.opacity)
    .call(onTransitionEnd, onEnd)
}

export const setTextAttributes = (
  selection: D3Selection | D3Transition,
  attributes: Object<any>,
  duration?: number,
  onEnd?: () => void
): void => {
  transitionOrSelection(selection, duration)
    .attr("x", attributes.x)
    .attr("y", attributes.y)
    .attr("dx", attributes.dx)
    .attr("dy", attributes.dy)
    .style("text-anchor", attributes.textAnchor)
    .attr("transform", attributes.transform)
    .text(attributes.text)
    .style("opacity", attributes.opacity || 1)
    .call(onTransitionEnd, onEnd)
}

export const setLineAttributes = (
  selection: D3Selection | D3Transition,
  attributes: Object<any>,
  duration?: number
): void => {
  transitionOrSelection(selection, duration)
    .style("stroke", attributes.color)
    .attr("x1", attributes.x || attributes.x1)
    .attr("x2", attributes.x || attributes.x2)
    .attr("y1", attributes.y || attributes.y1)
    .attr("y2", attributes.y || attributes.y2)
}

export const setRectAttributes = (selection: D3Selection | D3Transition, attributes: any, duration?: number): void => {
  transitionOrSelection(selection, duration)
    .attr("x", attributes.x)
    .attr("y", attributes.y)
    .attr("width", attributes.width)
    .attr("height", attributes.height)
    .style("fill", attributes.color)
    .style("stroke", attributes.stroke)
}
