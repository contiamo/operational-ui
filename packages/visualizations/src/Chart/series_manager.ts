import {
  filter,
  find,
  flow,
  forEach,
  get,
  includes,
  invoke,
  map,
  merge,
  reduce,
  remove,
  sortBy,
  uniqBy,
  uniqueId
} from "lodash/fp"
import { stack as d3Stack } from "d3-shape"
import Series from "./series/series"
import {
  Accessor,
  D3Selection,
  DataForLegends,
  Datum,
  EventBus,
  Object,
  RendererOptions,
  RendererType,
  SeriesAccessor,
  SeriesAccessors,
  SeriesData,
  SeriesManager,
  State,
  StateWriter
} from "./typings"

class ChartSeriesManager implements SeriesManager {
  el: D3Selection
  events: EventBus
  key: SeriesAccessor<string>
  oldSeries: Series[] = []
  renderAs: Accessor<Object<any> | RendererOptions<any>, RendererOptions<any>[]>
  series: Series[] = []
  state: State
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
    this.stateWriter("dataForLegends", this.dataForLegends())
    this.stateWriter("dataForAxes", this.dataForAxes())
    this.stateWriter("barSeries", this.barSeries())
  }

  private prepareData(): void {
    const data: SeriesData = flow(
      this.computeBarIndices.bind(this),
      this.handleStacks.bind(this),
      this.handleRanges.bind(this)
    )(this.state.current.get("accessors").data.series(this.state.current.get("data")))

    const currentKeys: string[] = map((datum: Object<any>): string => this.key(datum))(data)
    this.removeAllExcept(currentKeys)
    forEach((options: Object<any>): void => {
      const series: Series = this.get(this.key(options))
      series ? series.update(options) : this.create(options)
    })(data)

    this.stateWriter("series", this.series)
  }

  private computeBarIndices(data: SeriesData): SeriesData {
    let i: number = 0
    const barIndices: Object<number> = {}
    forEach((series: Object<any>): void => {
      const hasBars: boolean = !!find((renderOptions: RendererOptions<any>) => renderOptions.type === "bars")(
        this.renderAs(series)
      )
      const stackedRenderer: Object<any> = find(
        (renderOptions: RendererOptions<any>) => renderOptions.type === "stacked"
      )(this.renderAs(series))
      const hasStackedBars: boolean =
        !!stackedRenderer &&
        !!find((renderOptions: RendererOptions<any>) => renderOptions.type === "bars")(this.renderAs(stackedRenderer))
      if (!hasBars && !hasStackedBars) {
        return
      }
      if (hasBars) {
        barIndices[this.key(series)] = i
      }
      if (hasStackedBars) {
        forEach((stackedSeries: Object<any>) => {
          barIndices[this.key(stackedSeries)] = i
        })(series.data)
      }
      i = i + 1
    })(data)

    this.stateWriter("barIndices", barIndices)
    return data
  }

  private handleStacks(data: SeriesData): SeriesData {
    const stacks: Object<any>[] = filter((options: Object<any>): boolean => {
      const rendererTypes: (RendererType | "stacked")[] = map(get("type"))(this.renderAs(options))
      const isStacked: boolean = includes("stacked")(rendererTypes)
      if (isStacked && rendererTypes.length > 1) {
        throw new Error("Stacked renderers cannot be combined with non-stacked renderers")
      }
      return isStacked
    })(data)

    if (stacks.length === 0) {
      return
    }

    forEach.convert({ cap: false })(this.computeStack.bind(this))(stacks)

    let unstackedSeries: Object<any>[] = filter((options: Object<any>): boolean => {
      const rendererTypes: (RendererType | "stacked")[] = map(get("type"))(this.renderAs(options))
      return !includes("stacked")(rendererTypes)
    })(data)

    forEach((stack: Object<any>): void => {
      forEach((series: Object<any>): void => {
        // @TODO add missing datapoints to stacked series
        series.renderAs = this.renderAs(this.renderAs(stack)[0])
        unstackedSeries = unstackedSeries.concat(series)
      })(stack.data)
    })(stacks)

    return unstackedSeries
  }

  private computeStack(stack: Object<any>, index: number): void {
    const stackedSeries: Object<any>[] = stack.data as Object<any>[]
    // By default, stacks are vertical
    const stackAxis: "x" | "y" = this.renderAs(stack)[0].stackAxis || "y"
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

    forEach((series: Object<any>) => {
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
      const originalSeries: Object<any> = find({ key: series.key })(stackedSeries)
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
      originalSeries.stackIndex = index
    })(stackedData)
  }

  private handleRanges(data: SeriesData): SeriesData {
    return data
  }

  private get(key: string): any {
    return find((series: Series): boolean => this.key(series.options) === key)(this.series)
  }

  private remove(key: string): void {
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

  private dataForLegends(): DataForLegends {
    const data: any = {
      top: {
        left: [],
        right: []
      },
      bottom: {
        left: []
      }
    }

    forEach((series: Series): void => {
      data[series.legendPosition()][series.legendFloat()].push(series.dataForLegend())
    })(this.series)

    return data
  }

  private dataForAxes(): any[] {
    const data: any = { x1: [], x2: [], y1: [], y2: [] }
    forEach((series: Series): void => {
      const xAxis: string = series.xAxis()
      const yAxis: string = series.yAxis()
      data[xAxis] = uniqBy(String)(data[xAxis].concat(series.dataForAxis("x")))
      data[yAxis] = uniqBy(String)(data[yAxis].concat(series.dataForAxis("y")))
    })(this.series)

    return data
  }

  private barSeries(): Object<any> {
    return reduce((memo: Object<any>, series: Series): Object<any> => {
      const barsInfo: Object<any> = series.getBarsInfo()
      if (!barsInfo) {
        return memo
      }
      memo[series.key()] = barsInfo
      return memo
    }, {})(this.series)
  }

  private create(options: Object<any>): void {
    // @TODO Does stateWriter need to be passed in?
    this.series.push(new Series(this.state, this.stateWriter, this.events, this.el, options))
  }

  draw(): void {
    forEach(invoke("close"))(this.oldSeries)
    this.oldSeries = []
    forEach(invoke("draw"))(this.series)
  }
}

export default ChartSeriesManager
