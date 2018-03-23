import { setLineAttributes, setRectAttributes } from "../../utils/d3_utils"
import { AxisClass, AxisPosition, D3Selection, Object } from "../typings"
import { compact, flow, forEach, get, keys, map, mapValues, uniqBy, values } from "lodash/fp"
import * as styles from "./styles"

type Dimensions = { width: number; height: number }

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

export const insertElements = (el: D3Selection, position: AxisPosition, drawingDims: Dimensions): D3Selection => {
  const axisGroup: D3Selection = el
    .append("svg:g")
    .attr("class", `axis quant-axis ${position}`)
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

export const alignAxes = (axes: Object<AxisClass<any>>): Object<any> => {
  if (keys(axes).length !== 2) {
    return
  }
  const axesTypes: ("time" | "quant" | "categorical")[] = flow(values, map(get("type")), uniqBy(String))(axes)

  if (axesTypes.length > 1 || axesTypes[0] === "categorical") {
    throw new Error(`Axes of types ${axesTypes.join(", ")} cannot be aligned`)
  }

  return axesTypes[0] === "time" ? alignTimeAxes(axes) : alignQuantAxes(axes)
}

const alignTimeAxes = (axes: Object<AxisClass<Date>>): any => {}

const alignQuantAxes = (axes: Object<AxisClass<number>>): Object<any> => {
  // @TODO typing
  const computed: Object<any> = mapValues((axis: AxisClass<number>): any => axis.computeInitial())(axes)
  const axisKeys: string[] = keys(computed)
  const stepsOne: number[] = computed[axisKeys[0]].steps
  const stepsTwo: number[] = computed[axisKeys[1]].steps
  alignSteps(stepsOne, stepsTwo)
  computed[axisKeys[0]].steps = stepsOne
  computed[axisKeys[1]].steps = stepsTwo
  forEach.convert({ cap: false })((axis: AxisClass<number>, key: AxisPosition): void => {
    axis.computeAligned(computed[key])
  })(axes)
  return computed
}

const alignSteps = (one: number[], two: number[]): void => {
  const zeroOne: number[] = containsZero(one)
  const zeroTwo: number[] = containsZero(two)

  if (zeroOne && zeroTwo) {
    const max: [number, number] = [Math.max(zeroOne[0], zeroTwo[0]), Math.max(zeroOne[1], zeroTwo[1])]
    one[0] = one[0] - (max[0] - zeroOne[0]) * one[2]
    one[1] = one[1] + (max[1] - zeroOne[1]) * one[2]
    two[0] = two[0] - (max[0] - zeroTwo[0]) * two[2]
    two[1] = two[1] + (max[1] - zeroTwo[1]) * two[2]
  } else {
    const stepsL: number = (one[1] - one[0]) / one[2]
    const stepsR: number = (two[1] - two[0]) / two[2]
    const stepsDiff: number = stepsL - stepsR
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

export const positionBackgroundRect = (el: D3Selection, duration: number): void => {
  // Position background rect only once axis has finished transitioning.
  setTimeout((): void => {
    // Remove current background rect attributes so they do not affect the group dimension calculation.
    el.selectAll(`rect.${styles.componentRect}`).call(setRectAttributes, {})

    // Position background rect
    const group: ClientRect = el.node().getBoundingClientRect()
    const rect: ClientRect = (el.selectAll("rect").node() as Element).getBoundingClientRect()

    el
      .selectAll("rect")
      .call(setRectAttributes, {
        x: group.left - rect.left,
        y: group.top - rect.top,
        width: group.width,
        height: group.height
      })
  }, duration)
}
