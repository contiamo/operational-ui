import { filter, find, flow, forEach, includes, map, remove, uniqueId } from "lodash/fp"
import Series from "./series"
import {
  D3Selection,
  Datum,
  EventBus,
  RendererOptions,
  SeriesAccessor,
  SeriesAccessors,
  SeriesData,
  SeriesManager,
  SeriesOptions,
  State,
  StateWriter
} from "./typings"

class ChartSeriesManager implements SeriesManager {
  el: D3Selection
  events: EventBus
  oldSeries: any = []
  series: any = []
  state: any
  stateWriter: StateWriter
  // Accessors
  data: SeriesAccessor<Datum[] | SeriesOptions[]>
  hide: SeriesAccessor<boolean>
  hideInLegend: SeriesAccessor<boolean>
  key: SeriesAccessor<string>
  legendColor: SeriesAccessor<string>
  legendName: SeriesAccessor<string>
  renderAs: SeriesAccessor<RendererOptions<any>[]>
  unit: SeriesAccessor<string>
  xAxis: SeriesAccessor<"x1" | "x2">
  yAxis: SeriesAccessor<"y1" | "y2">

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
  }

  assignData(): void {
    this.assignAccessors()
    this.prepareData()
    // this.stateWriter("dataForLegend", this.renderer.dataForLegend())
  }

  private assignAccessors(): void {
    const accessors: SeriesAccessors = this.state.current.get("accessors").series
    forEach.convert({ cap: false })((accessor: SeriesAccessor<any>, key: string) => {
      // @TODO check this is necessary
      ;(this as any)[key] = accessor
    })(accessors)
  }

  private prepareData(): void {
    const data: SeriesData = this.state.current.get("accessors").data.series(this.state.current.get("data"))
    const currentKeys: string[] = map((datum: SeriesOptions): string => this.key(datum))(data)
    this.removeAllExcept(currentKeys)
    forEach((options: SeriesOptions): void => {
      const series: Series = this.get(this.key(options))
      series ? series.update(options) : this.create(options)
    })(data)
    this.stateWriter("series", this.series)
  }

  get(key: string): any {
    return find((series: Series): boolean => this.key(series.options) === key)(this.series)
  }

  remove(key: string): void {
    const series: Series = this.get(key)
    if (!series) {
      return
    }
    this.oldSeries.push(series)
    remove((series: any): boolean => this.key(series.options) === key)(this.series)
  }

  private removeAllExcept(ids: string[]): void {
    flow(filter((series: Series): boolean => !includes(this.key(series.options))(ids)), forEach(this.remove))(
      this.series
    )
  }

  create(options: SeriesOptions): void {
    // @TODO Do events, stateWriter, el need to be passed in?
    this.series.push(new Series(this.state, this.stateWriter, this.events, this.el, options))
  }

  // hasData(): boolean {
  //   return _.any(this.series, function(series: any): boolean { return series.hasData() })
  // }

  draw(): void {
    //   // Clean up any old stuff
    //   _.invoke(this.oldSeries, "close")
    //   this.oldSeries = []
    //   // Draw the new stuff
    //   _.invoke(this.series, "draw")
  }

  // @TODO
  // computeStack
  // computeRanges
  //
}

export default ChartSeriesManager
