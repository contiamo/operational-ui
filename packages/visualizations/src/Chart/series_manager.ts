import {
  compact,
  filter,
  find,
  flow,
  forEach,
  get,
  includes,
  invoke,
  map,
  merge,
  omitBy,
  reduce,
  remove,
  sortBy,
  uniq,
  uniqBy,
  uniqueId,
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
  AxisPosition,
} from "./typings"
import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from "constants"

class ChartSeriesManager implements SeriesManager {
  el: D3Selection
  events: EventBus
  key: SeriesAccessor<string>
  oldSeries: Series[] = []
  renderAs: Accessor<Object<any> | RendererOptions, RendererOptions[]>
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
    const isHidden = this.state.current.get("accessors").series.hide
    const data: SeriesData = flow(
      omitBy(isHidden),
      this.computeBarIndices.bind(this),
      this.handleGroupedSeries("stacked", this.computeStack.bind(this)),
      this.handleGroupedSeries("range", this.computeRange.bind(this))
    )(this.state.current.get("accessors").data.series(this.state.current.get("data")))

    const currentKeys: string[] = map((datum: Object<any>): string => this.key(datum))(data)
    this.removeAllExcept(currentKeys)
    forEach((options: Object<any>): void => {
      const series: Series = this.get(this.key(options))
      series ? series.update(options) : this.create(options)
    })(data)

    // Remove hidden series
    const visibleSeriesKeys: string[] = flow(
      filter((series: Series): boolean => !series.hide()),
      map((series: Series): string => this.key(series.options))
    )(this.series)
    this.removeAllExcept(visibleSeriesKeys)
  }

  private computeBarIndices(data: SeriesData): SeriesData {
    let i: number = 0
    const barIndices: Object<number> = {}
    forEach((series: Object<any>): void => {
      const hasBars: boolean = !!find((renderOptions: RendererOptions) => renderOptions.type === "bars")(
        this.renderAs(series)
      )
      const stackedRenderer: Object<any> = find((renderOptions: RendererOptions) => renderOptions.type === "stacked")(
        this.renderAs(series)
      )
      const hasStackedBars: boolean =
        !!stackedRenderer &&
        !!find((renderOptions: RendererOptions) => renderOptions.type === "bars")(this.renderAs(stackedRenderer))

      if (!hasBars && !hasStackedBars) {
        return
      }
      if (hasBars) {
        barIndices[this.key(series)] = i
      }
      if (hasStackedBars) {
        forEach((stackedSeries: Object<any>) => {
          barIndices[this.key(stackedSeries)] = i
        })(series.series)
      }
      i = i + 1
    })(data)

    this.stateWriter("barIndices", barIndices)
    return data
  }

  private handleGroupedSeries(type: "stacked" | "range", compute: any) {
    return (data: SeriesData): SeriesData => {
      const groups: Object<any>[] = filter((options: Object<any>): boolean => {
        const rendererTypes = map(get("type"))(this.renderAs(options))
        const isGrouped: boolean = includes(type)(rendererTypes)
        if (isGrouped && rendererTypes.length > 1) {
          throw new Error(`Renderer of type ${type} cannot be combined with other renderers`)
        }
        return isGrouped
      })(data)

      if (groups.length === 0) {
        return data
      }

      forEach.convert({ cap: false })(compute)(groups)

      let ungroupedSeries: Object<any>[] = filter((options: Object<any>): boolean => {
        const rendererTypes = map(get("type"))(this.renderAs(options))
        return !includes(type)(rendererTypes)
      })(data)

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

    forEach.convert({ cap: false })((series: Object<any>, i: number) => {
      series.clipData = range.series[1 - i].data
    })(range.series)
  }

  private computeStack(stack: Object<any>, index: number): void {
    // By default, stacks are vertical
    const stackAxis: "x" | "y" = (this.renderAs(stack)[0] as GroupedRendererOptions).stackAxis || "y"
    const baseAxis: "x" | "y" = stackAxis === "y" ? "x" : "y"

    const value = (series: Object<any>, axis: "x" | "y") => {
      const seriesAccessors: SeriesAccessors = this.state.current.get("accessors").series
      const attribute: any = (axis === "x" ? seriesAccessors.xAttribute : seriesAccessors.yAttribute)(series)
      return get(attribute)
    }

    // Transform data into suitable structure for d3 stack
    const seriesAccessors: SeriesAccessors = this.state.current.get("accessors").series
    const baseValues = reduce((memo: any[], series: Object<any>): any => {
      return memo.concat(map(value(series, baseAxis))(series.data))
    }, [])(stack.series)

    const dataToStack = flow(
      uniqBy(String),
      map((baseValue: string | number | Date) => {
        return { [baseAxis]: baseValue }
      }),
      sortBy(baseAxis as any)
    )(baseValues)

    forEach((series: Object<any>) => {
      forEach((datum: Datum) => {
        const newDatum = find((d: any) => String(d[baseAxis]) === String(value(series, baseAxis)(datum)))(dataToStack)
        newDatum[series.key] = value(series, stackAxis)(datum)
      })(series.data)
    })(stack.series)

    const seriesKeys = map(this.key)(stack.series)

    // Stack data
    const stackedData = d3Stack()
      .value((d, key) => d[key] || 0)
      .keys(seriesKeys)(dataToStack)

    // Return to series data structure
    // @TODO typings
    forEach((series: any) => {
      const originalSeries: Object<any> = find({ key: series.key })(stack.series)
      const xAttribute: string = this.state.current.get("accessors").series.xAttribute(originalSeries)
      const yAttribute: string = this.state.current.get("accessors").series.yAttribute(originalSeries)

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
    const data: any = {
      top: {
        left: [],
        right: [],
      },
      bottom: {
        left: [],
      },
    }

    forEach((series: Series): void => {
      if (series.hideInLegend()) {
        return
      }
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
        stack: series.options.stackIndex,
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
