import Events from "./event_catalog"
import * as d3 from "d3-selection"
import { reduce, isArray } from "lodash/fp"
import { IState, TStateWriter, TEvents, TSeriesEl } from "./typings"
import * as styles from "../styles/styles"

abstract class AbstractCanvas {
  container: d3.Selection<Element, {}, null, undefined>
  el: TSeriesEl
  events: TEvents
  focusEl: any
  protected elements: any = {}
  protected state: IState
  stateWriter: TStateWriter

  constructor(state: IState, stateWriter: TStateWriter, events: TEvents, context: any) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.insertContainer(context)
    this.insertEl()
    this.createInitialElements()
    this.listenToMouseOver()
  }

  abstract createEl(): TSeriesEl

  insertContainer(context: any): void {
    this.container = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", `${styles.chartContainer}`)
    context.appendChild(this.container.node())
  }

  insertEl(): void {
    this.el = this.createEl()
    this.container.node().appendChild(this.el.node())
  }

  insertFocusLabel(): void {
    this.focusEl = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", `${styles.focusLegend}`)
      .style("visibility", "hidden")
    this.container.node().appendChild(this.focusEl.node())
  }

  createInitialElements(): void {
    return
  }

  elementFor(component: string): any {
    const elMap: any = {
      series: this.el,
      focus: this.focusEl,
    }
    return elMap[component]
  }

  prefixedId(id: string): string {
    return this.state.current.get("config").uid + id
  }

  listenToMouseOver(): void {
    let el: any = this.mouseOverElement()
    if (el) {
      el.node()
        .addEventListener(
          "mouseenter",
          ((): void => {
            this.events.emit(Events.CHART.HOVER)
            this.trackMouseMove()
          }),
        )
       el.node()
        .addEventListener(
          "mouseleave",
          ((): void => {
            this.events.emit(Events.CHART.OUT)
            this.stopMouseMove()
          }),
        )
       el.node()
        .addEventListener(
          "click",
          ((): void => {
            this.events.emit(Events.CHART.CLICK)
          }),
        )
    }
  }

  rootElement(): Node {
    return this.container.node()
  }

  abstract mouseOverElement(): any

  trackMouseMove(): void {
    return
  }

  stopMouseMove(): void {
    return
  }

  seriesElements(): string[] | string[][] {
    return []
  }

  insertSeries(): { [key: string]: any[] } {
    let that: AbstractCanvas = this
    return reduce((memo: any, se: any): any => {
      let renderer: string = isArray(se) ? se[0] : se
      memo[renderer] = this.elements.series[renderer].append("svg:g")
      return memo
    }, {})(this.seriesElements())
  }

  draw(): void {
    const config = this.state.current.get("config")
    this.container.style("width", config.width + "px").style("height", config.height + "px")

    this.el.style("width", config.width + "px").style("height", config.height + "px")

    this.el
      .select("marker#arrow")
      .attr("fill", config.arrowFill)
      .attr("stroke", config.linkStroke)

    this.container.classed("hidden", this.state.current.get("config").hidden)
  }

  margin(side: string): number {
    return parseInt(this.el.style("margin-" + side), 10) || 0
  }

  resize(computed: any): void {
    return this.draw()
  }

  remove(): void {
    let el: any = this.mouseOverElement()
    if (el) {
      el.node().removeEventListener("mouseenter")
      el.node().removeEventListener("mouseleave")
      el.node().removeEventListener("click")
    }
    this.elements = {}
    this.container.remove()
    this.container = undefined
    this.el = undefined
  }
}

export default AbstractCanvas
