import {
  filter,
  find,
  flow,
  forEach,
  get,
  groupBy,
  includes,
  indexOf,
  invoke,
  map,
  mapKeys,
  merge,
  omitBy,
  reduce,
  remove,
  set,
  uniqBy,
} from "lodash/fp"
import { stack as d3Stack } from "d3-shape"
import Series from "./series/series"
import {
  Accessor,
  D3Selection,
  DataForLegends,
  Datum,
  EventBus,
  GroupedRendererOptions,
  Object,
  RendererOptions,
  SeriesAccessor,
  SeriesAccessors,
  SeriesData,
  SeriesManager,
  State,
  StateWriter,
} from "./typings"

class ChartSeriesManager implements SeriesManager {
  el: D3Selection
  events: EventBus
  key: SeriesAccessor<string>
  oldSeries: Series[] = []
  renderAs: Accessor<any, RendererOptions[]>
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
    this.stateWriter("axesWithFlags", this.axesWithFlags())
    this.stateWriter("dataForFocus", this.dataForFocus.bind(this))
  }

  private prepareData(): void {
    const data: SeriesData = flow(
      omitBy(this.state.current.get("accessors").series.hide),
      this.assignBarIndices.bind(this),
      this.handleGroupedSeries("stacked", this.computeStack.bind(this)),
      this.handleGroupedSeries("range", this.computeRange.bind(this))
    )(this.state.current.get("accessors").data.series(this.state.current.get("data")))

    this.removeAllExcept(map(this.key)(data))
    forEach(this.updateOrCreate.bind(this))(data)
  }

  private updateOrCreate(options: any): void {
    const series: Series = this.get(this.key(options))
    series ? series.update(options) : this.create(options)
  }

  // Assign bar index to each series
  // Grouped series will have the same bar index, while individual series will have unique indices
  // The bar indices are used to determine where bars are rendered respective to each tick.
  private assignBarIndices(data: SeriesData): SeriesData {
    let index: number = 0
    const barIndices: Object<number> = {}
    forEach((series: Object<any>): void => {
      const hasBars: boolean = !!find({ type: "bars" })(this.renderAs(series))

      const groupedRenderer: RendererOptions = find((options: any) => includes(options.type)(["stacked", "range"]))(
        this.renderAs(series)
      )
      const hasStackedBars: boolean = !!groupedRenderer && !!find({ type: "bars" })(this.renderAs(groupedRenderer))
      if (!hasBars && !hasStackedBars) {
        return
      }
      if (hasBars) {
        barIndices[this.key(series)] = index
      }
      if (hasStackedBars) {
        forEach((stackedSeries: Object<any>) => {
          barIndices[this.key(stackedSeries)] = index
        })(series.series)
      }
      index = index + 1
    })(data)

    this.stateWriter("barIndices", barIndices)
    return data
  }

  private handleGroupedSeries(type: "stacked" | "range", compute: any) {
    return (data: SeriesData): SeriesData => {
      const splitData: any = groupBy(options => {
        const rendererTypes = map(get("type"))(this.renderAs(options))
        return includes(type)(rendererTypes).toString()
      })(data)

      // Find all groups of specified type
      const groups: any[] = splitData.true

      // If there are no groups, no further data processing is necessary
      if (!groups) {
        return data
      }

      // Call provided `compute` method on each group
      forEach.convert({ cap: false })(compute)(groups)

      // Flatten data structure by appending each processed individual series of each group to the list of ungrouped series
      let ungroupedSeries: Object<any>[] = splitData.false || []

      forEach((group: Object<any>): void => {
        forEach((series: Object<any>): void => {
          series.renderAs = this.renderAs(this.renderAs(group)[0])
          ungroupedSeries = ungroupedSeries.concat(series)
        })(group.series)
      })(groups)

      return ungroupedSeries
    }
  }

  private computeRange(range: Object<any>, index: number): void {
    if (range.series.length !== 2) {
      throw new Error("Range renderer must have exactly 2 series.")
    }

    // Each series is assigned the data from the other series to be used for defining clip paths.
    forEach.convert({ cap: false })((series: Object<any>, i: number) => {
      series.clipData = range.series[1 - i].data
      series.stackIndex = `range${index + 1}`
    })(range.series)
  }

  private computeStack(stack: Object<any>, index: number): void {
    // By default, stacks are vertical
    const stackAxis: "x" | "y" = (this.renderAs(stack)[0] as GroupedRendererOptions).stackAxis || "y"
    const baseAxis: "x" | "y" = stackAxis === "y" ? "x" : "y"

    const accessors = this.state.current.get("accessors").series
    const baseAttribute = accessors[`${baseAxis}Attribute`]
    const stackAttribute = accessors[`${stackAxis}Attribute`]
    const baseValue = (series: any) => get(baseAttribute(series))
    const stackValue = (series: any) => get(stackAttribute(series))

    // Transform data into suitable structure for d3 stack
    const dataToStack = reduce((memo: any[], series: any) => {
      forEach((d: any) => {
        const datum = mapKeys.convert({ cap: false })(
          (val: any, key: string) => (val === baseValue(series)(d) ? baseAxis : this.key(series))
        )(d)
        const existingDatum = find({ [baseAxis]: baseValue(series)(d) })(memo)
        existingDatum ? (memo[indexOf(existingDatum)(memo)] = merge(datum)(existingDatum)) : memo.push(datum)
      })(series.data)
      return memo
    }, [])(stack.series)

    // Stack data
    const stackedData = d3Stack()
      .value((d, key) => d[key] || 0)
      .keys(map(this.key)(stack.series))(dataToStack)

    // Return to required series data structure
    forEach((series: any) => {
      const originalSeries: Object<any> = find({ key: series.key })(stack.series)
      originalSeries.data = map((datum: any): Datum => {
        return {
          [baseAxis]: datum.data[baseAxis],
          [stackAxis]: datum.data[series.key],
          [`${stackAxis}${0}`]: datum[0],
          [`${stackAxis}${1}`]: datum[1],
        }
      })(series)
      originalSeries.stacked = true
      originalSeries.stackIndex = index + 1
      originalSeries.xAttribute = "x"
      originalSeries.yAttribute = "y"
    })(stackedData)
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
    flow(
      filter((series: Series): boolean => !includes(this.key(series.options))(keys)),
      map((series: Series): string => this.key(series.options)),
      forEach(this.remove.bind(this))
    )(this.series)
  }

  private dataForLegends(): DataForLegends {
    return reduce((memo: DataForLegends, series: Series) => {
      if (series.hideInLegend()) {
        return memo
      }
      const position: "top" | "bottom" = series.legendPosition()
      const float: "left" | "right" = series.legendFloat()
      return set([position, float])((get([position, float])(memo) || []).concat(series.dataForLegend()))(memo)
    }, {})(this.series)
  }

  private dataForAxes(): any[] {
    return reduce((memo: any, series: Series) => {
      const xAxis: string = series.xAxis()
      const yAxis: string = series.yAxis()
      memo[xAxis] = uniqBy(String)((memo[xAxis] || []).concat(series.dataForAxis("x")))
      memo[yAxis] = uniqBy(String)((memo[yAxis] || []).concat(series.dataForAxis("y")))
      return memo
    }, {})(this.series)
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

  private axesWithFlags(): Object<any> {
    return reduce((axes: Object<any>, series: Series): Object<any> => {
      if (series.hasFlags()) {
        const flag: any = series.get("flag")
        axes[flag.axis] = axes[flag.axis] || { axisPadding: 0 }
        axes[flag.axis].axisPadding = Math.max(axes[flag.axis].axisPadding, flag.axisPadding)
      }
      return axes
    }, {})(this.series)
  }

  private dataForFocus(focusDates: Object<any>): Object<any> {
    const seriesWithoutFlags: Series[] = filter((series: Series): boolean => !series.get("flag"))(this.series)

    return map((series: Series): Object<any> => {
      const isMainAxis: boolean = includes(focusDates.main.axis)([series.xAxis(), series.yAxis()])
      const axisPriority: string = isMainAxis ? "main" : "comparison"

      return {
        ...series.valueAtFocus(focusDates[axisPriority].date),
        axisPriority,
        color: series.legendColor(),
        label: series.legendName(),
        displayPoint: series.displayFocusPoint(),
        stack: !series.options.clipData ? series.options.stackIndex : undefined,
      }
    })(seriesWithoutFlags)
  }

  private create(options: Object<any>): void {
    this.series.push(new Series(this.state, this.events, this.el, options))
  }

  draw(): void {
    forEach(invoke("close"))(this.oldSeries)
    this.oldSeries = []
    forEach(invoke("draw"))(this.series)
  }
}

export default ChartSeriesManager
