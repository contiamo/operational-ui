import Events from "./event_catalog"
import ComponentFocus from "./component_focus"
import { IEvents, IObject, IState, TD3Selection, TSeriesEl, TStateWriter } from "./typings"

abstract class Focus {
  componentEl: TD3Selection
  el: TSeriesEl
  focus: ComponentFocus
  state: IState
  stateWriter: TStateWriter
  events: IEvents

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, els: IObject) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = els.main
    this.componentEl = els.component
    this.events.on(Events.FOCUS.COMPONENT.MOUSEOVER, this.onComponentHover.bind(this))
    this.events.on(Events.FOCUS.COMPONENT.MOUSEOUT, this.onComponentLeave.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.MOUSEOVER, this.onElementHover.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.MOUSEOUT, this.onElementOut.bind(this))
    this.events.on(Events.CHART.MOUSEOUT, this.onMouseLeave.bind(this))
  }

  onComponentHover(payload: { component: TD3Selection; options: IObject }): void {
    this.removeComponentFocus({ force: true })
    this.focus = new ComponentFocus(this.state, this.componentEl, this.events, payload)
  }

  onComponentLeave(): void {
    setTimeout(this.removeComponentFocus.bind(this), 1)
  }

  removeComponentFocus(options: IObject = {}): void {
    if (options.uid && options.uid !== this.focus.uid) {
      return
    }

    if (!this.focus) {
      return
    }
    // Do not remove focusElement if it's currently under mouse over
    // i.e. mouse is on top of label
    !options.force && this.focus.isMouseOver
      ? this.events.on(Events.FOCUS.COMPONENT.LABEL.MOUSEOUT, this.remove.bind(this))
      : this.remove()
  }

  abstract onElementHover(payload: { focusPoint: any; d: any; hideLabel: boolean }): void

  onElementOut(): void {
    this.remove()
  }

  onMouseLeave(): void {
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)
  }

  remove(): void {
    this.el.node().innerHTML = ""
    this.el.style("visibility", "hidden")
  }
}

export default Focus
