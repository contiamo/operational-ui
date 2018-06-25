import { setLineAttributes, setRectAttributes, setTextAttributes } from "../../utils/d3_utils"
import { AxisClass, AxisOptions, AxisPosition, Dimensions, D3Selection, TimeAxisOptions } from "../typings"
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
  drawingDims: Dimensions,
): D3Selection => {
  const axisGroup = el
    .append("svg:g")
    .attr("class", `axis ${type}-axis ${position}`)
    .attr("transform", `translate(${axisPosition(position, drawingDims).join(",")})`)

  const elementGroup = axisGroup.append("svg:g").attr("class", "axis-elements")

  // Background rect for component hover
  elementGroup.append("svg:rect").attr("class", styles.componentRect)

  // Border
  elementGroup
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

  const axesTypes = flow(
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
  const computed = mapValues((axis: AxisClass<number>) => axis.computeInitial())(axes)
  const axisKeys = keys(computed) as string[]
  const intervalOne = (axes[axisKeys[0]].options as TimeAxisOptions).interval
  const intervalTwo = (axes[axisKeys[1]].options as TimeAxisOptions).interval
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
  const computed = mapValues((axis: AxisClass<number>) => axis.computeInitial())(axes)
  const axisKeys = keys(computed)
  forEach((name: string) => {
    const stepsOne = computed[axisKeys[0]][name]
    const stepsTwo = computed[axisKeys[1]][name]
    alignSteps(stepsOne, stepsTwo)
    computed[axisKeys[0]][name] = stepsOne
    computed[axisKeys[1]][name] = stepsTwo
  })(["tickSteps", "labelSteps", "ruleSteps"])
  forEach.convert({ cap: false })((axis: AxisClass<number>, key: AxisPosition) => {
    axis.computeAligned(computed[key])
  })(axes)
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

export const positionBackgroundRect = (el: D3Selection, position: string, duration: number): void => {
  // Remove current background rect attributes so they do not affect the group dimension calculation.
  el.selectAll(`rect.${styles.componentRect}`).call(setRectAttributes, {})

  // Position background rect only once axis has finished transitioning.
  setTimeout((): void => {
    // Position background rect
    const group = el.node().getBBox()
    el.selectAll("rect").call(setRectAttributes, {
      x: position === "y1" ? -group.width : group.x,
      y: position === "x2" ? -group.height : group.y,
      width: group.width,
      height: group.height,
    })
  }, duration)
}

const textAnchor = {
  x1: (rotateLabels: boolean) => (rotateLabels ? "end" : "middle"),
  x2: (rotateLabels: boolean) => (rotateLabels ? "start" : "middle"),
  y1: (rotateLabels: boolean) => "end",
  y2: (rotateLabels: boolean) => "start",
}

export const getTextAnchor = (axis: AxisPosition, isRotated: boolean): string => {
  return textAnchor[axis](isRotated)
}

const titlePositions = {
  x1: { x: 0.5, y: 1 },
  x2: { x: 0.5, y: -1 },
  y1: { x: -1, y: 0.5 },
  y2: { x: 1, y: 0.5 },
}

const getTitleAttributes = (el: D3Selection, position: AxisPosition, fontSize: number, range: [number, number]) => {
  const elBox = (el.select("g.axis-elements").node() as any).getBBox()
  const titlePosition = titlePositions[position]
  const width = position[0] === "x" ? range[1] - range[0] : elBox.width
  const height = position[0] === "x" ? elBox.height : Math.abs(range[1] - range[0])
  const x = (width + (position[0] === "y" ? fontSize : 0)) * titlePosition.x
  const y = (height + (position[0] === "x" ? fontSize : 0)) * titlePosition.y
  const rotation = position[0] === "y" ? -90 : 0
  return {
    x,
    y,
    text: String,
    textAnchor: "middle",
    transform: `rotate(${rotation}, ${x}, ${y})`,
  }
}

export const drawTitle = (
  el: D3Selection,
  axisOptions: AxisOptions,
  position: AxisPosition,
  range: [number, number],
): void => {
  const attributes = getTitleAttributes(el, position, axisOptions.titleFontSize, range)

  const title = el.selectAll("text.title").data(axisOptions.title ? [axisOptions.title] : [])

  title.exit().remove()

  title
    .enter()
    .append("svg:text")
    .attr("class", "title")
    .merge(title)
    .attr("font-size", axisOptions.titleFontSize)
    .call(setTextAttributes, attributes)
}
