import Events from "./event_catalog"
import * as d3 from "d3-selection"
import { isArray, reduce } from "lodash/fp"
import { IEvents, IObject, IState, TD3Selection, TSeriesEl, TStateWriter } from "./typings"
import * as styles from "../styles/styles"

abstract class Canvas {
  container: TD3Selection
  el: TSeriesEl
  events: IEvents
  focusEl: TD3Selection
  protected elements: IObject = {}
  protected state: IState
  protected elMap: IObject = {}
  stateWriter: TStateWriter

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, context: Element) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.insertContainer(context)
    this.insertEl()
    this.createInitialElements()
    this.listenToMouseOver()
  }

  abstract createEl(): TSeriesEl

  insertContainer(context: Element): void {
    this.container = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", `${styles.chartContainer}`)
    context.appendChild(this.container.node())
  }

  insertEl(): void {
    this.el = this.createEl()
    this.container.node().appendChild(this.el.node())
    this.elMap.series = this.el
  }

  insertFocusLabel(): void {
    this.focusEl = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", `${styles.focusLegend}`)
      .style("visibility", "hidden")
    this.container.node().appendChild(this.focusEl.node())
    this.elMap.focus = this.focusEl
  }

  createInitialElements(): void {
    return
  }

  elementFor(component: string): TD3Selection {
    return this.elMap[component]
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

  abstract mouseOverElement(): TD3Selection

  trackMouseMove(): void {
    return
  }

  stopMouseMove(): void {
    return
  }

  seriesElements(): string[] | string[][] {
    return []
  }

  insertSeries(): IObject {
    let that: Canvas = this
    return reduce((memo: IObject, se: any): IObject => {
      let renderer: string = isArray(se) ? se[0] : se
      memo[renderer] = this.elements.series[renderer].append("svg:g")
      return memo
    }, {})(this.seriesElements())
  }

  draw(): void {
    const config = this.state.current.get("config")
    this.container.style("width", config.width + "px").style("height", config.height + "px")
    this.el.style("width", config.width + "px").style("height", config.height + "px")
    this.container.classed("hidden", config.hidden)
  }

  margin(side: string): number {
    return parseInt(this.el.style("margin-" + side), 10) || 0
  }

  resize(computed: IObject): void {
    return this.draw()
  }

  remove(): void {
    let el: TD3Selection = this.mouseOverElement()
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

export default Canvas
