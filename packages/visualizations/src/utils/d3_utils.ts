import { Selection } from "d3-selection"
import { Transition } from "d3-transition"
import { D3Selection } from "../shared/typings"
import { isFunction } from "lodash/fp"

export type D3Transition = Transition<any, any, any, any>

// Method to explicitly pass the selected element to a method called on a D3 selection
// This enables the use of arrow functions and/or context binding without losing
// the reference to the element.
export const withD3Element = (func: any) => {
  // This may NOT be an arrow function as we need to capture 'this'
  return function(datum: any, ...args: any[]): any {
    return func(datum, this, ...args)
  }
}

export type D3SelectionOrTransition = D3Selection | D3Transition

// Type guard: We need some way to discriminate transitions from selections
function isTransition(element: D3SelectionOrTransition): element is D3Transition {
  return (<D3Transition>element).attrTween !== undefined
}

// Returns a transition if a duration is specified
const transitionIfDuration = (selection: D3SelectionOrTransition, duration?: number) => {
  return duration != null ? selection.transition().duration(duration) : selection
}

// Helper function to trigger a callback function when all elements of a selection have finished transitioning
// @TODO Add a simple unit test for this to avoid off-by-one errors
export const onTransitionEnd = (selection: D3Transition, func?: () => void): any => {
  if (!func) {
    return
  }
  if (selection.empty()) {
    func()
    return
  }

  // This immediately invoked function expression nicely encapsules the counting code
  const counter = (() => {
    let count = 0
    return {
      incr: () => (count = count + 1),
      decr: () => (count = count - 1),
    }
  })()
  return selection.each(counter.incr).on("end", () => counter.decr() === 0 && func())
}

/*
 * Attribute Setter Helpers
 */
export type AttributeSetter<A> = (
  selection: D3SelectionOrTransition,
  attributes: Partial<A>,
  duration?: number,
  onEnd?: () => void,
) => void

export const setPathAttributes: AttributeSetter<{
  path: any
  fill: string | any
  stroke: string | any
  opacity: number | any
  // If a custom path transition interpolation is provided (e.g. for pie chart arc transitions),
  // the path attribute "d" needs to be updated using `attrTween` rather than `attr`
  isTween: boolean
}> = (selection, attributes, duration, onEnd) => {
  const elements = transitionIfDuration(selection, duration)
    .style("fill", attributes.fill)
    .style("stroke", attributes.stroke)
    .style("opacity", attributes.opacity)

  isTransition(elements) && attributes.isTween
    ? elements.attrTween("d", attributes.path)
    : elements.attr("d", attributes.path)

  if (isTransition(elements)) {
    elements.call(onTransitionEnd, onEnd)
  }
}

export const setTextAttributes: AttributeSetter<{
  x: number | any
  y: number | any
  dx: number | any
  dy: number | any
  textAnchor: string | any
  transform: string | any
  text: string | any
  opacity?: number | any
}> = (selection, attributes, duration, onEnd) => {
  const elements = transitionIfDuration(selection, duration)
    .attr("x", attributes.x)
    .attr("y", attributes.y)
    .attr("dx", attributes.dx)
    .attr("dy", attributes.dy)
    .style("text-anchor", attributes.textAnchor)
    .attr("transform", attributes.transform)
    .text(attributes.text)
    .style("opacity", attributes.opacity || 1)

  if (isTransition(elements)) {
    elements.call(onTransitionEnd, onEnd)
  }
}

export const setLineAttributes: AttributeSetter<{
  color: string | any
  x: number | any
  y: number | any
  y1: number | any
  y2: number | any
  x1: number | any
  x2: number | any
}> = (selection, attributes, duration, onEnd) => {
  const elements = transitionIfDuration(selection, duration)
    .style("stroke", attributes.color)
    .attr("x1", attributes.x || attributes.x1)
    .attr("x2", attributes.x || attributes.x2)
    .attr("y1", attributes.y || attributes.y1)
    .attr("y2", attributes.y || attributes.y2)

  if (isTransition(elements)) {
    elements.call(onTransitionEnd, onEnd)
  }
}

export const setRectAttributes: AttributeSetter<{
  color: string | any
  stroke: string | any
  x: number | any
  y: number | any
  width: number | any
  height: number
}> = (selection, attributes, duration, onEnd) => {
  const elements = transitionIfDuration(selection, duration)
    .attr("x", attributes.x)
    .attr("y", attributes.y)
    .attr("width", attributes.width)
    .attr("height", attributes.height)
    .style("fill", attributes.color)
    .style("stroke", attributes.stroke)

  if (isTransition(elements)) {
    elements.call(onTransitionEnd, onEnd)
  }
}
