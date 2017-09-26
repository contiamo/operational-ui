import { map } from "lodash/fp"
import { scaleLinear as d3ScaleLinear } from "d3-scale"
import { TNode, TLink, TScale, TState } from "../typings"

abstract class AbstractRenderer {
  computed: any
  config: any
  data: TNode[] | TLink[]
  state: TState

  constructor(state: TState) {
    this.state = state
  }

  draw(data: TNode[] | TLink[]): void {
    this.data = data
    this.config = this.state.current.config
    this.updateDraw(this.state.current.computed.el)
  }

  abstract updateDraw(svg: any): void

  abstract exit(exitEls: any): void

  abstract enterAndUpdate(enterEls: any): void

  sizeScale(range: [number, number]): TScale {
    const sizes: number[] = map((el: TLink | TNode): number => {
      return el.size()
    })(this.data)
    return d3ScaleLinear()
      .domain([0, Math.max(...sizes)])
      .range(range)
  }
}

export default AbstractRenderer
