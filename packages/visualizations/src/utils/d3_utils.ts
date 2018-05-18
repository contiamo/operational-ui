import { Selection } from "d3-selection"
import { Transition } from "d3-transition"
import { D3Selection, D3Transition, Object } from "./typings"
import { isFunction } from "lodash/fp"

// #Michael: Would be nice to have a comment here - why do we need this?
export const withD3Element = (func: (datum: any, ...args: any[]) => any) => {
  // This may NOT be an arrow function as we need to capture 'this'
  return function(datum: any, ...args: any[]): any {
    return func(datum, this, ...args)
  }
}


type D3SelectionOrTransition = D3Selection | D3Transition

// Type guard: We need some way to discriminate transitions from selections
function isTransition(element: D3SelectionOrTransition): element is D3Transition {
  return (<D3Transition>element).attrTween !== undefined
}

// Returns a transition if a duration is specified
const transitionIfDuration = (selection: D3SelectionOrTransition, duration?: number) => {
  return duration != null ? selection.transition().duration(duration) : selection
}

// Only animates transitions if the document can be seen
// N.B. can only be used if no attribute interpolation required
export const transitionIfVisible = (selection: D3Selection, duration: number) => {
  return document.hidden ? selection : selection.transition().duration(duration)
}

// Helper function to trigger a callback function when all elements of a selection have finished transitioning
// #Michael: Would be nice to have a simple unit test for this to avoid off-by-one errors
const onTransitionEnd = (selection: D3Transition, func?: () => void): any => {
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
      incr: () => count = count + 1,
      decr: () => count = count - 1
    }
  })()
  return selection.each(counter.incr).on("end", () => counter.decr() === 0 && func())
}

/*
 * Attribute Setter Helpers
 */
type AttributeSetter<A> = (
  selection: D3SelectionOrTransition,
  attributes: A,
  duration?: number,
  onEnd?: () => void
) => void

export const setPathAttributes: AttributeSetter<{
  path: any,
  fill: string,
  stroke: string,
  opacity: number
}> = (selection, attributes, duration, onEnd) => {
  const elements = transitionIfDuration(selection, duration)
    .style("fill", attributes.fill)
    .style("stroke", attributes.stroke)
    .style("opacity", attributes.opacity)

  if (isTransition(elements)) {
    elements
      .attrTween("d", attributes.path)
      .call(onTransitionEnd, onEnd)
  } else {
    elements
      .attr("d", attributes.path)
  }
}

export const setTextAttributes: AttributeSetter<{
  x: number,
  y: number,
  dx: number,
  dy: number,
  textAnchor: string,
  transform: string,
  text: string,
  opacity?: number
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
  color: string
} & Partial<{
  x: number,
  y: number
  y1: number,
  y2: number
  x1: number,
  x2: number,
}>> = (selection, attributes, duration, onEnd) => {
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
  color: string,
  stroke: string,
  x: number,
  y: number,
  width: number,
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
