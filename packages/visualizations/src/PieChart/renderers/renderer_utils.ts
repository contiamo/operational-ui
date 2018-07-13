import {
  Accessor,
  ComputedArcs,
  ComputedData,
  ComputedDatum,
  D3Selection,
  Datum,
  Dimensions,
  Renderer,
  RendererAccessor,
  RendererAccessors,
} from "../typings"

import { defaults, forEach, merge, reduce } from "lodash/fp"
import * as styles from "./styles"
import { Selection, select } from "d3-selection"
import { arc as d3Arc, Arc, pie as d3Pie, Pie, PieArcDatum } from "d3-shape"
import { interpolateObject } from "d3-interpolate"
import { colorAssigner } from "../../utils/colorAssigner"
import { withD3Element } from "../../utils/d3_utils"
import { approxZero, stepFunction } from "../../utils/font_sizing_utils"

export const assignOptions = (ctx: Renderer, options: { [key: string]: any }): void => {
  forEach.convert({ cap: false })(
    (option: any, key: string): void => {
      if (key !== "accessors") {
        ;(ctx as any)[key] = option
      }
    },
  )(options)
  assignAccessors(ctx, options.accessors)
}

export const defaultAccessors = (ctx: Renderer): RendererAccessors => {
  const assignColor = colorAssigner(ctx.state.current.get("config").palette)
  return {
    value: (d: Datum) => d.value,
    key: (d: Datum) => d.key,
    color: (d: Datum) => (d.unfilled ? undefined : assignColor(ctx.key(d))),
  }
}

export const assignAccessors = (ctx: Renderer, customAccessors: Partial<RendererAccessors>): void => {
  const accessors: RendererAccessors = defaults(defaultAccessors(ctx))(customAccessors)
  forEach.convert({ cap: false })(
    (option: any, key: string): void => {
      ;(ctx as any)[key] = (d: any): any => option(d.data || d)
    },
  )(accessors)
}

// Establish coordinate system with 0,0 being the center of the width, height rectangle
export const computeTranslate = (drawingDims: Dimensions, yOffset: number = 0): [number, number] => {
  return [drawingDims.width / 2, (drawingDims.height + yOffset) / 2]
}

// Translate back to 0,0 in top left
export const translateBack = (point: [number, number], currentTranslation: [number, number]): [number, number] => {
  return [point[0] + currentTranslation[0], point[1] + currentTranslation[1]]
}

export const textAttributes = (computed: ComputedArcs) => {
  return {
    transform: (d: Datum) => translateString(computed.arcOver.centroid(d)),
    text: percentageString,
    textAnchor: "middle",
  }
}

export const percentageString = (d: ComputedDatum) => {
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
  const exitingArcs = arcs.exit()

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
  const enteringArcs = arcs
    .enter()
    .append("svg:g")
    .attr("class", styles.arc)
    .on("mouseenter", mouseOverHandler)
    .on("mouseout", mouseOutHandler)

  enteringArcs.append("svg:path")
  enteringArcs.append("svg:rect").attr("class", styles.labelBackground)
  enteringArcs.append("svg:text").attr("class", styles.label)
}

const RECT_PADDING = 2

export const updateBackgroundRects = (updatingArcs: D3Selection, centroid: any, visibility: string): void => {
  updatingArcs.each(
    withD3Element(
      (d: Datum, el: HTMLElement): void => {
        const element: D3Selection = select(el)
        const textDimensions: any = (element.select("text").node() as any).getBBox()
        const transform: [number, number] = [
          centroid(d)[0] + textDimensions.x - RECT_PADDING,
          centroid(d)[1] + textDimensions.y - RECT_PADDING,
        ]

        element
          .select("rect")
          .attr("width", textDimensions.width + RECT_PADDING * 2)
          .attr("height", textDimensions.height + RECT_PADDING * 2)
          .attr("rx", 5)
          .attr("ry", 5)
          .attr("transform", translateString(transform))
          .attr("visibility", visibility)

        element.select("text").attr("visibility", visibility)
      },
    ),
  )
}

export const updateTotal = (
  el: D3Selection,
  label: string,
  duration: number,
  options: { maxTotalFontSize: number; minTotalFontSize: number; innerRadius: number; yOffset: string },
): void => {
  let total = el
    .select(`g.${styles.total}`)
    .selectAll("text")
    .data([label])

  total
    .exit()
    .style("font-size", "1px")
    .remove()

  const mergedTotal = total
    .enter()
    .append("svg:text")
    .attr("text-anchor", "middle")
    .merge(total)
    .text(String)

  const node = mergedTotal.node()
  if (node) {
    const y = stepFunction(mergedTotal, options.innerRadius)
    // start with min font size
    if (y(options.minTotalFontSize) < 0) {
      // Not enough room - do not show total
      total = total.data([])
    } else {
      // change font size until bounding box is completely filled or max font size is reached
      mergedTotal.style("font-size", Math.min(options.maxTotalFontSize, approxZero(y, options.minTotalFontSize)) + "px")
      mergedTotal.attr("dy", options.yOffset)
    }
  }
}

export const computeTotal = (data: Datum[], valueAccessor: RendererAccessor<number>): number => {
  return reduce((memo: number, datum: Datum) => {
    const value = valueAccessor(datum)
    return memo + (value || 0)
  }, 0)(data)
}

export const calculatePercentages = (data: Datum[], valueAccessor: RendererAccessor<number>, total: number): void => {
  forEach(
    (datum: Datum): void => {
      datum.percentage = (valueAccessor(datum) / total) * 100
    },
  )(data)
}

export const layout = (valueAccessor: Accessor<any, number>, angleRange: [number, number]): Pie<any, any> => {
  return d3Pie()
    .sort(null)
    .value(valueAccessor)
    .startAngle(angleRange[0])
    .endAngle(angleRange[1])
}

export const removeArcTween = (computed: ComputedData, angleRange: [number, number]) => {
  return (d: ComputedDatum, i: number) => {
    const innerRadius = computed.rInner
    const outerRadius = computed.r
    const f = interpolateObject(
      { endAngle: d.endAngle, startAngle: d.startAngle },
      { innerRadius, outerRadius, endAngle: angleRange[1], startAngle: angleRange[1] },
    )
    return (t: number): string => computed.arc(f(t))
  }
}

export const updateFilteredPathAttributes = (
  selection: D3Selection,
  filterFunc: RendererAccessor<boolean>,
  path: any,
  arcInfo: { [key: string]: any } = {},
): void => {
  selection
    .filter(filterFunc)
    .select("path")
    .attr("d", path)
}
