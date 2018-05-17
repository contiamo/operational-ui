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
  EventBus,
  Object,
  RendererOptions,
  SeriesAccessor,
  SeriesData,
  SeriesManager,
  State,
  StateWriter,
} from "./typings"
import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from "constants"

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
    this.stateWriter("axesWithFlags", this.axesWithFlags())
  }

  private prepareData(): void {
    const isHidden = this.state.current.get("accessors").series.hide
    const data: SeriesData = flow(omitBy(isHidden), this.computeBarIndices.bind(this))(
      this.state.current.get("accessors").data.series(this.state.current.get("data"))
    )

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
