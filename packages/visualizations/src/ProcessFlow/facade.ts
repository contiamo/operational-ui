import ProcessFlowCanvas from "./canvas"
import Series from "./series"
import ProcessFlowFocus from "./focus"
import Events from "../shared/event_catalog"
import StateHandler from "../shared/state_handler"
import EventEmitter from "../shared/event_bus"
import { isEmpty, uniqueId } from "lodash/fp"
import defaultNumberFormatter from "../utils/number_formatter"

import {
  Accessors,
  AccessorsObject,
  Components,
  Facade,
  FocusElement,
  InputData,
  LinkAttrs,
  NodeAttrs,
  ProcessFlowConfig,
  TNode,
} from "./typings"

const defaultConfig = (): ProcessFlowConfig => {
  return {
    borderColor: "#fff",
    duration: 1e3,
    focusElement: {},
    focusLabelPosition: "toRight",
    height: Infinity,
    hidden: false,
    highlightColor: "#1499CE",
    horizontalNodeSpacing: 100,
    labelOffset: 1,
    linkBorderWidth: 4,
    maxLinkWidth: 8,
    maxNodeSize: 1500,
    minLinkWidth: 1,
    minNodeSize: 100,
    nodeBorderWidth: 10,
    numberFormatter: defaultNumberFormatter,
    showLinkFocusLabels: true,
    showNodeFocusLabels: true,
    uid: uniqueId("processflow"),
    verticalNodeSpacing: 100,
    visualizationName: "processflow",
    width: Infinity,
  }
}

const defaultAccessors = (): AccessorsObject => {
  return {
    data: {
      nodes: (d: InputData) => d.nodes,
      journeys: (d: InputData) => d.journeys,
    },
    node: {
      color: (d: NodeAttrs): string => d.color || "#fff",
      content: (d: NodeAttrs): { [key: string]: any }[] => d.content || [],
      shape: (d: NodeAttrs): string => d.shape || "squareDiamond",
      size: (d: NodeAttrs): number => d.size || 1,
      stroke: (d: NodeAttrs): string => d.stroke || "#000",
      id: (d: NodeAttrs): string => d.id || uniqueId("node"),
      label: (d: NodeAttrs): string => d.label || d.id || "",
      labelPosition: (d: NodeAttrs): string => d.labelPosition || "right",
    },
    link: {
      content: (d: NodeAttrs): { [key: string]: any }[] => d.content || [],
      dash: (d: LinkAttrs): string => d.dash || "0",
      label: (d: LinkAttrs): string => `${d.label || d.source.label()} → ${d.target.label() || ""}`,
      size: (d: LinkAttrs): number => d.size || 1,
      stroke: (d: LinkAttrs): string => d.stroke || "#bbb",
      source: (d: LinkAttrs): TNode | undefined => d.source,
      sourceId: (d: LinkAttrs): string | undefined => d.sourceId,
      target: (d: LinkAttrs): TNode | undefined => d.target,
      targetId: (d: LinkAttrs): string | undefined => d.targetId,
    },
  }
}

class ProcessFlowFacade implements Facade {
  private __disposed: boolean = false
  private canvas: ProcessFlowCanvas
  private components: Components
  private context: Element
  private events: EventEmitter
  private series: Series
  private state: StateHandler<ProcessFlowConfig, InputData>

  constructor(context: Element) {
    this.context = context
    this.events = new EventEmitter()
    this.state = this.insertState()
    this.canvas = this.insertCanvas()
    this.components = this.insertComponents()
    this.series = this.insertSeries()
  }

  private insertState(): StateHandler<ProcessFlowConfig, InputData> {
    return new StateHandler({
      data: {},
      config: defaultConfig(),
      accessors: defaultAccessors(),
      computed: {},
    })
  }

  private insertCanvas(): ProcessFlowCanvas {
    return new ProcessFlowCanvas(
      this.state.readOnly(),
      this.state.computedWriter(["canvas"]),
      this.events,
      this.context,
    )
  }

  private insertComponents(): Components {
    return {
      focus: new ProcessFlowFocus(
        this.state.readOnly(),
        this.state.computedWriter(["focus"]),
        this.events,
        this.canvas.elementFor("focus"),
      ),
    }
  }

  private insertSeries(): Series {
    return new Series(
      this.state.readOnly(),
      this.state.computedWriter(["series"]),
      this.events,
      this.canvas.elementFor("series"),
    )
  }

  data(data?: any): any {
    return this.state.data(data)
  }

  config(config?: Partial<ProcessFlowConfig>): ProcessFlowConfig {
    return this.state.config(config)
  }

  accessors(type: string, accessors: Accessors<any>): Accessors<any> {
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

    const focusElement: FocusElement = this.state.config().focusElement
    !isEmpty(focusElement)
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

export default ProcessFlowFacade
