import Canvas from "./canvas"
import Series from "./series"
import Focus from "./focus"
import Events from "../utils/event_catalog"
import StateHandler from "../utils/state_handler"
import EventEmitter from "../utils/event_bus"
import { IAccessors, IAccessorsObject, IConfig, IFocusElement, IComputedState, IInputData, IChartStateObject, IObject, INodeAttrs, ILinkAttrs, TNode } from "./typings"
import { uniqueId } from "lodash/fp"

class Facade {
  __disposed: boolean = false
  canvas: Canvas
  components: IObject
  context: Element
  events: EventEmitter
  series: Series
  state: StateHandler<IConfig>

  constructor(context: Element) {
    this.context = context
    this.events = new EventEmitter()
    this.state = this.insertState()
    this.canvas = this.insertCanvas()
    this.components = this.insertComponents()
    this.series = this.insertSeries()
  }

  insertState(): StateHandler<IConfig> {
    return new StateHandler({
      data: {},
      config: this.initialConfig(),
      accessors: this.initialAccessors(),
      computed: this.initialComputed(),
    })
  }

  initialConfig(): IConfig {
    return {
      borderColor: "#fff",
      duration: 1e3,
      height: Infinity,
      hidden: false,
      highlightColor: "#1499CE",
      horizontalNodeSpacing: 100,
      labelOffset: 2,
      linkBorderWidth: 4,
      maxLinkWidth: 8,
      maxNodeSize: 1500,
      minLinkWidth: 1,
      minNodeSize: 100,
      nodeBorderWidth: 10,
      showLinkFocusLabels: true,
      showNodeFocusLabels: true,
      uid: uniqueId("processflow"),
      verticalNodeSpacing: 100,
      visualizationName: "processflow",
      width: Infinity
    }
  }

  initialAccessors(): IAccessorsObject {
    return {
      data: {
        nodes: (d: IInputData) => d.nodes,
        journeys: (d: IInputData) => d.journeys
      },
      node: {
        color: (d: INodeAttrs): string => d.color || "#fff",
        shape: (d: INodeAttrs): string => d.shape || "squareDiamond",
        size: (d: INodeAttrs): number => d.size || 1,
        stroke: (d: INodeAttrs): string => d.stroke || "#000",
        id: (d: INodeAttrs): string => d.id || uniqueId("node"),
        label: (d: INodeAttrs): string => d.label || d.id || "",
        labelPosition: (d: INodeAttrs): string => d.labelPosition || "right",
      },
      link: {
        dash: (d: ILinkAttrs): string => d.dash || "0",
        label: (d: ILinkAttrs): string => d.label || d.source.label() + " → " + d.target.label() || "",
        size: (d: ILinkAttrs): number => d.size || 1,
        stroke: (d: ILinkAttrs): string => d.stroke || "#bbb",
        source: (d: ILinkAttrs): TNode | undefined => d.source,
        sourceId: (d: ILinkAttrs): string | undefined => d.sourceId,
        target: (d: ILinkAttrs): TNode | undefined => d.target,
        targetId: (d: ILinkAttrs): string | undefined => d.targetId,
      },
    }
  }

  initialComputed(): IComputedState {
     return {
      canvas: {},
      focus: {},
      series: {},
    }
  }

  insertCanvas(): Canvas {
    return new Canvas(
      this.state.readOnly(),
      this.state.computedWriter(["canvas"]),
      this.events,
      this.context
    )
  }

  insertComponents(): IObject {
    return {
      focus: new Focus(
        this.state.readOnly(),
        this.state.computedWriter(["focus"]),
        this.events,
        this.canvas.elementFor("focus"),
      ),
    }
  }

  insertSeries(): Series {
    return new Series(
      this.state.readOnly(),
      this.state.computedWriter(["series"]),
      this.events,
      this.canvas.elementFor("series"),
    )
  }

  data<T>(data?: T): T {
    return this.state.data(data)
  }

  config(config?: Partial<IConfig>): IConfig {
    return this.state.config(config)
  }

  accessors(type: string, accessors: IObject): IAccessors {
    return this.state.accessors(type, accessors)
  }

  on(event: string, handler: any): void {
    this.events.on(event, handler)
  }

  off(event: string, handler: any): void {
    this.events.removeListener(event, handler)
  }

  draw(): Element {
    this.state.captureState()
    this.series.prepareData()
    this.canvas.draw()
    this.series.draw()

    const focusElement: IFocusElement = this.state.config().focusElement
    focusElement
      ? this.events.emit(Events.FOCUS.ELEMENT.HIGHLIGHT, focusElement)
      : this.events.emit(Events.FOCUS.ELEMENT.OUT)

    return this.canvas.elementFor("series").node()
  }

  close(): void {
    if (this.__disposed) {
      return
    }
    this.__disposed = true
    this.canvas.remove()
    this.events.removeAll()
    this.context.innerHTML = ""
  }
}

export default Facade
