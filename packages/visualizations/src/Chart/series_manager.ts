import { filter, find, flow, forEach, get, includes, map, reduce, remove, sortBy, uniqBy, uniqueId } from "lodash/fp"
import { stack as d3Stack } from "d3-shape"
import Series from "./series/series"
import {
  Accessor,
  D3Selection,
  Datum,
  EventBus,
  StackedSeriesOptions,
  RendererOptions,
  RendererType,
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
  key: SeriesAccessor<string>
  oldSeries: any = []
  renderAs: Accessor<StackedSeriesOptions | RendererOptions<any>, RendererOptions<any>[]>
  series: any = []
  state: any
  stateWriter: StateWriter

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
  }

  assignData(): void {
    this.key = this.state.current.get("accessors").series.key
    this.renderAs = this.state.current.get("accessors").series.renderAs
    this.prepareData()
    // this.stateWriter("dataForLegend", this.renderer.dataForLegend())
  }

  private prepareData(): void {
    const data: SeriesData = flow(this.handleStacks.bind(this), this.handleRanges.bind(this))(
      this.state.current.get("accessors").data.series(this.state.current.get("data"))
    )

    const currentKeys: string[] = map((datum: SeriesOptions): string => this.key(datum))(data)
    this.removeAllExcept(currentKeys)
    forEach((options: SeriesOptions): void => {
      const series: Series = this.get(this.key(options))
      series ? series.update(options) : this.create(options)
    })(data)
    this.stateWriter("series", this.series)
  }

  handleStacks(data: SeriesData): SeriesData {
    const stacks: StackedSeriesOptions[] = filter((options: SeriesOptions): boolean => {
      const rendererTypes: (RendererType | "stacked")[] = map(get("type"))(options.renderAs)
      const isStacked: boolean = includes("stacked")(rendererTypes)
      if (isStacked && rendererTypes.length > 1) {
        throw new Error("Stacked renderers cannot be combined with non-stacked renderers")
      }
      return isStacked
    })(data)
    if (stacks.length === 0) {
      return
    }

    forEach(this.computeStack.bind(this))(stacks)

    let unstackedSeries: SeriesOptions[] = filter((options: SeriesOptions): boolean => {
      const rendererTypes: (RendererType | "stacked")[] = map(get("type"))(options.renderAs)
      return !includes("stacked")(rendererTypes)
    })(data)

    forEach((stack: StackedSeriesOptions): void => {
      forEach((series: SeriesOptions): void => {
        series.renderAs = stack.renderAs[0].renderAs
        unstackedSeries = unstackedSeries.concat(series)
      })(stack.data)
    })(stacks)

    return unstackedSeries
  }

  computeStack(stack: StackedSeriesOptions): void {
    const stackedSeries: SeriesOptions[] = stack.data as SeriesOptions[]
    // By default, stacks are vertical
    const stackAxis: "x" | "y" = stack.renderAs[0].stackAxis || "y"
    const baseAxis: "x" | "y" = stackAxis === "y" ? "x" : "y"

    // Transform data into suitable structure for d3 stack
    const dataToStack = flow(
      map(get("data")),
      reduce((memo: any[], data: Datum[]): any[] => {
        return memo.concat(map(get(baseAxis))(data))
      }, []),
      uniqBy(String),
      map((baseValue: string | number | Date) => {
        return { [baseAxis]: baseValue }
      }),
      sortBy(baseAxis as any)
    )(stackedSeries)

    forEach((series: SeriesOptions) => {
      forEach((datum: Datum) => {
        const newDatum = find((d: any) => String(d[baseAxis]) === String(datum[baseAxis]))(dataToStack)
        newDatum[series.key] = datum.y
      })(series.data)
    })(stackedSeries)

    const seriesKeys = map(this.key)(stackedSeries)

    // Stack data
    const stackedData = d3Stack()
      .value((d, key) => d[key] || 0)
      .keys(seriesKeys)(dataToStack)

    // Return to series data structure
    // @TODO typings
    forEach((series: any) => {
      const originalSeries: SeriesOptions = find({ key: series.key })(stackedSeries)
      // @TODO typing
      originalSeries.data = map((datum: any): Datum => {
        return {
          [baseAxis]: datum.data[baseAxis],
          [stackAxis]: datum.data[series.key],
          [`${stackAxis}${0}`]: datum[0],
          [`${stackAxis}${1}`]: datum[1]
        }
      })(series)
      originalSeries.stacked = true
    })(stackedData)
  }

  handleRanges(data: SeriesData): SeriesData {
    return data
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

  private removeAllExcept(keys: string[]): void {
    flow(filter((series: Series): boolean => !includes(this.key(series.options))(keys)), forEach(this.remove))(
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
}

export default ChartSeriesManager
