import { setLineAttributes, setRectAttributes } from "../../utils/d3_utils"
import { Selection } from "d3-selection"
import { AxisClass, AxisPosition, Dimensions, D3Selection } from "../typings"
import { flow, forEach, get, keys, last, map, mapValues, times, uniqBy, values } from "lodash/fp"
import * as styles from "./styles"
import * as moment from "moment"

export const axisPosition = (position: AxisPosition, drawingDims: Dimensions): [number, number] => {
  switch (position) {
    case "x1":
      return [0, drawingDims.height]
    case "x2":
      return [0, 0]
    case "y1":
      return [0, 0]
    case "y2":
      return [drawingDims.width, 0]
  }
}

export const insertElements = (
  el: D3Selection,
  type: string,
  position: AxisPosition,
  drawingDims: Dimensions
): D3Selection => {
  const axisGroup = el
    .append("svg:g")
    .attr("class", `axis ${type}-axis ${position}`)
    .attr("transform", `translate(${axisPosition(position, drawingDims).join(",")})`)

  // Background rect for component hover
  axisGroup.append("svg:rect").attr("class", styles.componentRect)

  // Border
  axisGroup
    .append("svg:line")
    .attr("class", styles.border)
    .call(setLineAttributes, { x1: 0, x2: 0, y1: 0, y2: 0 })

  return axisGroup
}

export const computeRequiredMargin = (
  axis: D3Selection,
  configuredMargin: number,
  outerPadding: number,
  position: AxisPosition,
): number => {
  const axisDimension = axis.node().getBBox()[position[0] === "x" ? "height" : "width"]
  return Math.max(configuredMargin, Math.ceil(axisDimension) + outerPadding)
}

export const translateAxis = (el: D3Selection, position: AxisPosition, drawingDims: Dimensions): void => {
  el.attr("transform", `translate(${axisPosition(position, drawingDims).join(",")})`)
}

export const alignAxes = (axes: { [key: string]: AxisClass<any> }) => {
  if (keys(axes).length !== 2) {
    return
  }
  const axesTypes: ("time" | "quant" | "categorical")[] = flow(
    values,
    map(get("type")),
    uniqBy(String),
  )(axes)

  if (axesTypes.length > 1 || axesTypes[0] === "categorical") {
    throw new Error(`Axes of types ${axesTypes.join(", ")} cannot be aligned`)
  }

  axesTypes[0] === "time" ? alignTimeAxes(axes) : alignQuantAxes(axes)
}

const alignTimeAxes = (axes: { [key: string]: AxisClass<Date> }): void => {
  const computed: { [key: string]: Partial<AxisComputed> } = mapValues(
    (axis: AxisClass<number>): Partial<AxisComputed> => axis.computeInitial(),
  )(axes)

  const axisKeys: string[] = keys(computed)
  const intervalOne: any = axes[axisKeys[0]].interval
  const intervalTwo: any = axes[axisKeys[1]].interval
  if (intervalOne !== intervalTwo) {
    throw new Error("Time axes must have the same interval")
  }

  const ticksInDomainOne = computed[axisKeys[0]].ticksInDomain
  const ticksInDomainTwo = computed[axisKeys[1]].ticksInDomain
  if (ticksInDomainOne.length < ticksInDomainTwo.length) {
    times(() => {
      ticksInDomainOne.push(
        moment(last(ticksInDomainOne))
          .add(1, intervalOne)
          .toDate(),
      )
    })(ticksInDomainTwo.length - ticksInDomainOne.length)
  } else {
    times(() => {
      ticksInDomainTwo.push(
        moment(last(ticksInDomainTwo))
          .add(1, intervalTwo)
          .toDate(),
      )
    })(ticksInDomainOne.length - ticksInDomainTwo.length)
  }
  computed[axisKeys[0]].ticksInDomain = ticksInDomainOne
  computed[axisKeys[1]].ticksInDomain = ticksInDomainTwo

  forEach.convert({ cap: false })(
    (axis: AxisClass<number>, key: AxisPosition): void => {
      axis.computeAligned(computed[key])
    },
  )(axes)
}

const alignQuantAxes = (axes: { [key: string]: AxisClass<number> }): void => {
  const computed: { [key: string]: Partial<AxisComputed> } = mapValues(
    (axis: AxisClass<number>): Partial<AxisComputed> => axis.computeInitial(),
  )(axes)
  const axisKeys: string[] = keys(computed)
  const stepsOne: [number, number, number] = computed[axisKeys[0]].steps
  const stepsTwo: [number, number, number] = computed[axisKeys[1]].steps
  alignSteps(stepsOne, stepsTwo)
  computed[axisKeys[0]].steps = stepsOne
  computed[axisKeys[1]].steps = stepsTwo
  forEach.convert({ cap: false })(
    (axis: AxisClass<number>, key: AxisPosition): void => {
      axis.computeAligned(computed[key])
    },
  )(axes)
}

const alignSteps = (one: number[], two: number[]): void => {
  const zeroOne = containsZero(one)
  const zeroTwo = containsZero(two)

  if (zeroOne && zeroTwo) {
    const max = [Math.max(zeroOne[0], zeroTwo[0]), Math.max(zeroOne[1], zeroTwo[1])]
    one[0] = one[0] - (max[0] - zeroOne[0]) * one[2]
    one[1] = one[1] + (max[1] - zeroOne[1]) * one[2]
    two[0] = two[0] - (max[0] - zeroTwo[0]) * two[2]
    two[1] = two[1] + (max[1] - zeroTwo[1]) * two[2]
  } else {
    const stepsL = (one[1] - one[0]) / one[2]
    const stepsR = (two[1] - two[0]) / two[2]
    const stepsDiff = stepsL - stepsR
    if (stepsDiff > 0) {
      two[0] = two[0] - Math.floor(stepsDiff / 2) * two[2]
      two[1] = two[1] + Math.ceil(stepsDiff / 2) * two[2]
    } else if (stepsDiff < 0) {
      one[0] = one[0] + Math.ceil(stepsDiff / 2) * one[2]
      one[1] = one[1] - Math.floor(stepsDiff / 2) * one[2]
    }
  }
}

const containsZero = (step: number[]): [number, number] => {
  return step[0] <= 0 && step[1] >= 0 ? [Math.abs(step[0] / step[2]), step[1] / step[2]] : undefined
}

export const positionBackgroundRect = (el: any, duration: number): void => {
  el.selectAll(`rect.${styles.componentRect}`).call(setRectAttributes, {})
  // Remove current background rect attributes so they do not affect the group dimension calculation.

  // Position background rect only once axis has finished transitioning.
  setTimeout((): void => {
    // Position background rect
    const group = el.node().getBoundingClientRect()
    const rect = (el.selectAll("rect").node() as Element).getBoundingClientRect()

    el.selectAll("rect").call(setRectAttributes, {
      x: group.left - rect.left,
      y: group.top - rect.top,
      width: group.width,
      height: group.height,
    })
  }, duration)
}
