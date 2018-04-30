import {
  Accessor,
  ComputedArcs,
  ComputedData,
  ComputedDatum,
  D3Selection,
  Datum,
  Object,
  Renderer,
  RendererAccessor,
  RendererAccessors,
} from "../typings"
import { defaults, forEach, reduce } from "lodash/fp"
import * as styles from "./styles"
import { Selection } from "d3-selection"
import { arc as d3Arc, Arc, pie as d3Pie, Pie, PieArcDatum } from "d3-shape"
import { interpolateObject } from "d3-interpolate"
import { colorAssigner } from "@operational/utils"

// y is a step-function (with two x values resulting in the same y value)
// on the positive integer domain which is monotonic decreasing
export const approxZero = (y: (x: number) => number, initialX: number): number => {
  // make sure to get points with different y value
  const p0: { x: number; y: number } = { x: initialX, y: y(initialX) }
  const p1: { x: number; y: number } = { x: initialX + 2, y: y(initialX + 2) }

  // Solve for 0
  const m: number = (p0.y - p1.y) / (p0.x - p1.x)
  const xZero: number = -p0.y / m + p0.x

  // Find nearest integer value for x that has y > 0
  let xInt: number = Math.round(xZero)
  for (let i: number = 0; i <= 10; i = i + 1) {
    if (y(xInt) <= 0) {
      xInt = xInt - 1
    }
  }

  return xInt
}

export const assignOptions = (ctx: Renderer, options: Object<any>): void => {
  forEach.convert({ cap: false })((option: any, key: string): void => {
    if (key !== "accessors") {
      ;(ctx as any)[key] = option
    }
  })(options)
  assignAccessors(ctx, options.accessors)
}

export const defaultAccessors = (ctx: Renderer): RendererAccessors => {
  const assignColor: (key: string) => string = colorAssigner(ctx.state.current.get("config").palette)
  return {
    value: (d: Datum): number => d.value,
    key: (d: Datum): string => d.key,
    color: (d: Datum): string => (d.unfilled ? undefined : assignColor(ctx.key(d))),
  }
}

export const assignAccessors = (ctx: Renderer, customAccessors: Partial<RendererAccessors>): void => {
  const accessors: RendererAccessors = defaults(defaultAccessors(ctx))(customAccessors)
  forEach.convert({ cap: false })((option: any, key: string): void => {
    ;(ctx as any)[key] = (d: any): any => option(d.data || d)
  })(accessors)
}

// Establish coordinate system with 0,0 being the center of the width, height rectangle
export const computeTranslate = (
  drawingDims: { width: number; height: number },
  yOffset: number = 0
): [number, number] => {
  return [drawingDims.width / 2, (drawingDims.height + yOffset) / 2]
}

// Translate back to 0,0 in top left
export const translateBack = (point: [number, number], currentTranslation: [number, number]): [number, number] => {
  return [point[0] + currentTranslation[0], point[1] + currentTranslation[1]]
}

export const textAttributes = (computed: ComputedArcs): Object<any> => {
  return {
    transform: (d: Datum): string => translateString(computed.arcOver.centroid(d)),
    text: percentageString,
    textAnchor: "middle",
  }
}

export const percentageString = (d: ComputedDatum): string | null => {
  return d.data.percentage ? d.data.percentage.toFixed(1) + "%" : null
}

export const translateString = (values: [number, number]): string => {
  return `translate(${values.join(", ")})`
}

export const createArcGroups = (el: D3Selection, data: ComputedDatum[], key: RendererAccessor<string>): D3Selection => {
  return el
    .select("g.arcs")
    .selectAll(`g.${styles.arc}`)
    .data(data, key)
}

export const exitArcs = (arcs: D3Selection, duration: number, path: any): void => {
  const exitingArcs: D3Selection = arcs.exit()

  exitingArcs
    .transition()
    .duration(duration)
    .select("path")
    .attrTween("d", path)

  exitingArcs
    .transition()
    .duration(duration)
    .select(`text.${styles.label}`)
    .style("opacity", "1e6")

  exitingArcs.remove()
}

export const enterArcs = (arcs: D3Selection, mouseOverHandler: any, mouseOutHandler: any): void => {
  const enteringArcs: D3Selection = arcs
    .enter()
    .append("svg:g")
    .attr("class", styles.arc)
    .on("mouseenter", mouseOverHandler)
    .on("mouseout", mouseOutHandler)

  enteringArcs.append("svg:path")

  enteringArcs.append("svg:text").attr("class", styles.label)
}

// @TODO move last 3 parameters into object
export const updateTotal = (
  el: D3Selection,
  label: string,
  duration: number,
  options: { minTotalFontSize: number; innerRadius: number; yOffset: string }
): void => {
  let total: any = el
    .select(`g.${styles.total}`)
    .selectAll("text")
    .data([label])

  total
    .exit()
    .style("font-size", "1px")
    .remove()

  const mergedTotal: D3Selection = total
    .enter()
    .append("svg:text")
    .attr("text-anchor", "middle")
    .merge(total)
    .text(String)

  const node: any = mergedTotal.node()
  if (node) {
    const y = (x: number): number => {
      mergedTotal.style("font-size", x + "px")
      // Text should fill half of available width (0.5 * diameter = radius)
      return options.innerRadius - node.getBBox().width
    }

    // start with min font size
    if (y(options.minTotalFontSize) < 0) {
      // Not enough room - do not show total
      total = total.data([])
    } else {
      // change font size until bounding box is completely filled
      // @TODO CHECK THIS
      mergedTotal.style("font-size", approxZero(y, options.minTotalFontSize) + "px")
      mergedTotal.attr("dy", options.yOffset)
    }
  }
}

export const computeTotal = (data: Datum[], valueAccessor: RendererAccessor<number>): number => {
  return reduce((memo: number, datum: Datum): number => {
    const value: number = valueAccessor(datum)
    return memo + (value || 0)
  }, 0)(data)
}

export const calculatePercentages = (data: Datum[], valueAccessor: RendererAccessor<number>, total: number): void => {
  forEach((datum: Datum): void => {
    datum.percentage = valueAccessor(datum) / total * 100
  })(data)
}

export const layout = (valueAccessor: Accessor<any, number>, angleRange: [number, number]): Pie<any, any> => {
  return d3Pie()
    .sort(null)
    .value(valueAccessor)
    .startAngle(angleRange[0])
    .endAngle(angleRange[1])
}

export const removeArcTween = (computed: ComputedData, angleRange: [number, number]) => {
  return (d: ComputedDatum, i: number): ((t: number) => string) => {
    const innerRadius: number = computed.rInner
    const outerRadius: number = computed.r
    const f = interpolateObject(
      { endAngle: d.endAngle, startAngle: d.startAngle },
      { innerRadius, outerRadius, endAngle: angleRange[1], startAngle: angleRange[1] }
    )
    return (t: number): string => computed.arc(f(t))
  }
}

export const updateFilteredPathAttributes = (
  selection: D3Selection,
  filterFunc: RendererAccessor<boolean>,
  path: any,
  shadowDef?: string
): void => {
  selection
    .filter(filterFunc)
    .attr("d", path)
    .attr("filter", shadowDef ? `url(#${shadowDef})` : null)
}
