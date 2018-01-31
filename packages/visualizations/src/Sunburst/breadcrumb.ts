import * as d3 from "d3-selection"
import { TD3Selection, TDatum, IObject, IState, TStateWriter, IEvents } from "./typings"
import Events from "../utils/event_catalog"
import { isEmpty, last } from "lodash/fp"
import * as styles from "./styles"

const dims: IObject = {
  width: 70,
  height: 20,
  space: 3,
  tip: 7
}

const breadcrumbPolygonStart: string = `0,0 ${dims.width}, 0 ${dims.width + dims.tip}, ${dims.height / 2} ${
  dims.width
}, ${dims.height} 0, ${dims.height}`
const breadcrumbPolygon: string = `0,0 ${dims.width},0 ${dims.width + dims.tip},${dims.height / 2} ${dims.width},${
  dims.height
} 0,${dims.height} ${dims.tip},${dims.height / 2}`

class Breadcrumb {
  el: TD3Selection
  events: IEvents
  state: IState
  stateWriter: TStateWriter

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TD3Selection) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
    this.el.insert("svg:svg", ":first-child")
    this.events.on(Events.FOCUS.ELEMENT.CLICK, this.updateHoverPath.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.MOUSEOVER, this.updateHoverPath.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.MOUSEOUT, this.updateHoverPath.bind(this))
  }

  updateHoverPath(payload: IObject): void {
    const computed: IObject = this.state.current.get("computed").renderer

    const fixedNode: any = computed.zoomNode || computed.topNode
    const nodeArray: any[] = payload.d ? payload.d.ancestors().reverse() : fixedNode.ancestors().reverse()

    const percentageString =
      nodeArray.length > 1 ? (last(nodeArray).value * 100 / computed.topNode.value).toPrecision(3) + "%" : ""

    this.update(nodeArray, percentageString)
  }

  breadcrumbPoints(d: any, i: number): string {
    return i > 0 ? breadcrumbPolygon : breadcrumbPolygonStart
  }

  label(d: TDatum, i: number): string {
    // Pixel width of character approx 1/2 of font-size - allow 7px per character
    const desiredPixelWidth: number = dims.width - (i > 0 ? dims.tip : 0) - dims.tip - 2 * dims.space,
      numberOfCharacters: number = desiredPixelWidth / 7
    const name: string = d.data.name || ""
    return name.substring(0, numberOfCharacters) + (name.length > numberOfCharacters ? "..." : "")
  }

  update(nodeArray: any[], percentage: string): void {
    // Data join; key function combines name and depth (= position in sequence).
    let trail = this.el
      .select("svg")
      .selectAll("g")
      .data(nodeArray, d => d.data.name + d.depth)

    // Remove exiting nodes.
    trail.exit().remove()

    // Add breadcrumb and label for entering nodes.
    let entering = trail.enter().append("svg:g")

    entering
      .append("svg:polygon")
      .attr("points", this.breadcrumbPoints)
      .style("fill", (d: TDatum): string => d.data.color || "#fff")
      .style("stroke", (d: TDatum): string => (d.data.color ? "none" : "000"))
      .on("click", this.onClick.bind(this))

    entering
      .append("svg:text")
      .attr("x", (d, i) => (i > 0 ? dims.tip : 0) + dims.space)
      .attr("y", dims.height / 2)
      .attr("dy", "0.35em")
      .text(this.label)

    // Merge enter and update selections; set position for all nodes.
    entering.merge(trail).attr("transform", (d: TDatum, i: number): string => {
      return `translate(${i * (dims.width + dims.space)}, 0)`
    })

    // Update the explanation.
    this.el
      .select(`.${styles.explanation}`)
      .style("visibility", () => (percentage.length > 0 ? "visible" : "hidden"))
      .select(".percentage")
      .text(percentage)
  }

  onClick(d: TDatum): void {
    this.events.emit(Events.FOCUS.ELEMENT.CLICK, { d })
  }
}

export default Breadcrumb
