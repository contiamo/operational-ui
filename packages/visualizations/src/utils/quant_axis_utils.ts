import * as d3 from "d3-selection"
import { extent as d3Extent, range as d3Range } from "d3-array"
import { find, isNil, last } from "lodash/fp"
import { scaleLinear } from "d3-scale"

export const computeScale = (range: [number, number], ticks: number[]): ((val: number) => number) => {
  return scaleLinear()
    .range(range)
    .domain(d3Extent(ticks))
}

// Computes nice steps (for ticks) given a domain [start, stop] and a
// wanted number of ticks (number of ticks returned might differ
// by a few ticks)
export const computeSteps = (
  domain: [number, number],
  range: [number, number],
  spacing: number,
  minTicks: number,
): [number, number, number] => {
  const tickNumber: number = this.computeTickNumber(range, spacing, minTicks)

  const span: number = domain[1] - domain[0]
  let step: number = Math.pow(10, Math.floor(Math.log(Math.abs(span) / tickNumber) / Math.LN10))
  if (span < 0) {
    step = step * -1
  }
  const err: number = (tickNumber / span) * step
  const errorMapper: [boolean, number][] = [[err <= 0.15, 10], [err <= 0.35, 5], [err <= 0.75, 2], [true, 1]]
  const multiplier: number = find(0)(errorMapper)[1]

  step *= multiplier
  return [
    Math.floor(domain[0] / step) * step, // start
    Math.ceil(domain[1] / step) * step, // stop
    step, // step
  ]
}

export const computeTickNumber = (range: [number, number], tickSpacing: number, minTicks: number = 0): number => {
  const length: number = Math.abs(range[0]) + Math.abs(range[1])
  return Math.max(Math.floor(length / tickSpacing), minTicks)
}

export const computeTicks = (steps: [number, number, number]): number[] => {
  const ticks: number[] = d3Range.apply(d3, steps)
  ticks.push(steps[1])
  return ticks
}

export const computeDomain = (data: number[], start: number, end: number): [number, number] => {
  if (end < start) {
    throw new Error("Start value cannot be greater than end value.")
  }
  const extent: [number, number] = this.extentCushion(this.guess(data))
  return [start || extent[0], end || extent[1]]
}

// Increase the extent by 5% on both sides (so that there's some space
// between the drawings and the borders of the chart), unless one of the ends
// equals 0
export const extentCushion = (extent: [number, number]): [number, number] => {
  const distance: number = extent[1] - extent[0]
  return [
    extent[0] !== 0 ? extent[0] - 0.05 * distance : extent[0],
    extent[1] !== 0 ? extent[1] + 0.05 * distance : extent[1],
  ]
}

// Guess start, end from data
export const guess = (data: number[] = []): number[] => {
  const extent: number[] = d3Extent(data)

  // If this axis is user configured but does not currently have any data,
  // we still need to guess some extent here - otherwise animations will blow up
  if (isNil(extent[0])) {
    return [0, 100]
  }

  // Start and end are the same
  if (extent[0] === extent[1]) {
    const val: number = extent[0]
    // This is somewhat arbitrary but we have to come up with something...
    // We return here as no further processing (smart, cut, zero) is possible
    return val === 0
      ? [0, 100]
      : // Make sure axis has right direction
        val < 0
        ? [2 * val, 0]
        : [0, 2 * val]
  }

  // Ensure domain includes zero
  extent[0] = extent[0] > 0 ? 0 : extent[0]
  extent[1] = extent[1] < 0 ? 0 : extent[1]

  return extent
}

export const ruleClass = (ruleValue: number, index: number, ticks: number[]): string => {
  return index === ticks.indexOf(0) ? "zero" : ""
}

const suffixes: { [key: number]: string } = {
  0: "",
  3: "k",
  6: "m",
  9: "bn",
}

// Formats the numbers on a quant axis and replaces the last tick with a unit tick, if provided.
export const tickFormatter = (
  step: number,
  unitTick: number,
  displayUnit: string,
): ((num: number) => number | string) => {
  const exp: number = -Math.floor(Math.log(step) / Math.LN10)
  const expMatch: number = 3 * Math.round(exp / 3)
  const expMax: number = Math.max(exp, expMatch)
  const suffix: string = suffixes[-expMatch]

  return suffix != null
    ? function(num: number): number | string {
        if (num === unitTick) {
          return displayUnit
        }
        const display: number =
          Math.round(num * Math.pow(10, expMax)) / +Math.pow(10, expMax - expMatch).toFixed(expMax - expMatch)
        return display === 0 ? display : display + suffix
      }
    : function(num: number): number | string {
        if (num === unitTick) {
          return displayUnit
        }
        return num % 1 === 0 ? num : num.toFixed(2)
      }
}
