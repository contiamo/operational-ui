import { Accessor, Config, Facade, Focus, Legend, Object } from "../utils/typings";
import { DateRange } from "moment-range";
export { Accessor, Accessors, ComponentConfigOptions, ComponentHoverPayload, EventBus, Legend, Object, State, Partial, D3Selection, SeriesEl, SeriesManager, StateWriter, Canvas } from "../utils/typings";
export interface XAxisConfig {
    margin: number;
    minTicks: number;
    outerPadding: number;
    tickOffset: number;
    tickSpacing: number;
}
export interface YAxisConfig extends XAxisConfig {
    minTopOffsetTopTick: number;
}
export interface AxisConfig extends XAxisConfig {
    minTopOffsetTopTick?: number;
}
export declare type FocusElement = string;
export interface ChartConfig extends Config {
    innerBarPadding: number;
    innerBarPaddingCategorical: number;
    legend: boolean;
    maxBarWidthRatio: number;
    minBarWidth: number;
    numberFormatter: (x: number) => string;
    outerBarPadding: number;
    timeAxisPriority: string[];
}
export declare type RendererType = "area" | "bars" | "flag" | "line" | "symbol" | "text";
export declare type RendererAccessor<T> = (series?: any, d?: Datum) => T;
export declare type InterpolationOption = "cardinal" | "linear" | "monotoneX" | "monotoneY" | "step" | "stepAfter" | "stepBefore";
export interface LinearRendererAccessors {
    color: RendererAccessor<string>;
    interpolate: RendererAccessor<InterpolationOption>;
    closeGaps: RendererAccessor<boolean>;
}
export declare type AreaRendererAccessors = LinearRendererAccessors;
export interface BarsRendererAccessors {
    color: RendererAccessor<string>;
    barWidth: RendererAccessor<number>;
}
export interface FlagRendererAccessors {
    color: RendererAccessor<string>;
    description: RendererAccessor<string>;
    direction: RendererAccessor<"up" | "down">;
    label: RendererAccessor<string>;
}
export interface LineRendererAccessors extends LinearRendererAccessors {
    dashed: RendererAccessor<boolean>;
}
export declare type RangeRendererAccessors = LinearRendererAccessors;
export interface SymbolRendererAccessors {
    stroke: RendererAccessor<string>;
    fill: RendererAccessor<string>;
    symbol: RendererAccessor<any>;
    size: RendererAccessor<number>;
}
export interface TextRendererAccessors {
    size: RendererAccessor<number>;
}
export interface TextRendererConfig {
    offset: number;
    rotate: {
        horizontal: number;
        vertical: number;
    };
}
export interface RendererOptions<RendererAccessors> {
    type: RendererType | "stacked";
    accessors?: Partial<RendererAccessors>;
    config?: Object<any>;
    renderAs?: RendererOptions<any>[];
    stackAxis?: "x" | "y";
}
export interface RendererClass<RendererAccessors> {
    dataForAxis: (axis: "x" | "y") => any[];
    draw: () => void;
    type: RendererType;
    update: (data: Datum[], options: RendererOptions<RendererAccessors>) => void;
    close: () => void;
}
export interface Datum {
    x?: string | number | Date;
    x0?: number;
    x1?: number;
    y?: string | number | Date;
    y0?: number;
    y1?: number;
    injectedX?: string | number | Date;
    injectedY?: string | number | Date;
    [key: string]: any;
}
export declare type SeriesData = Object<any>[];
export declare type SeriesAccessor<T> = Accessor<Object<any>, T>;
export interface SeriesAccessors {
    data: SeriesAccessor<Datum[] | Object<any>[]>;
    hide: SeriesAccessor<boolean>;
    hideInLegend: SeriesAccessor<boolean>;
    key: SeriesAccessor<string>;
    legendColor: SeriesAccessor<string>;
    legendName: SeriesAccessor<string>;
    renderAs: SeriesAccessor<RendererOptions<any>[]>;
    axis: SeriesAccessor<AxisPosition>;
    xAttribute: SeriesAccessor<string>;
    yAttribute: SeriesAccessor<string>;
    xAxis: SeriesAccessor<"x1" | "x2">;
    yAxis: SeriesAccessor<"y1" | "y2">;
}
export declare type AxisPosition = "x1" | "x2" | "y1" | "y2";
export declare type AxisType = "time" | "quant" | "categorical";
export declare type TimeIntervals = "hour" | "day" | "week" | "month" | "quarter" | "year";
export interface TimeAxisOptions extends AxisConfig {
    type: string;
    start: Date;
    end: Date;
    interval: TimeIntervals;
}
export interface QuantAxisOptions extends AxisConfig {
    type: string;
    start?: number;
    end?: number;
    interval?: number;
    unit?: string;
}
export interface CategoricalAxisOptions extends AxisConfig {
    type: string;
    values?: string[];
}
export declare type AxisOptions = TimeAxisOptions | QuantAxisOptions | CategoricalAxisOptions;
export interface AxesData {
    [key: string]: AxisOptions;
}
export interface AxisComputed {
    domain?: [number, number] | DateRange;
    range: [number, number];
    scale: any;
    steps?: [number, number, number];
    tickFormatter?: (d: any) => string;
    ticks: any[];
    ticksInDomain?: Date[];
    tickNumber?: number;
    tickWidth?: number;
}
export interface AxisAttributes {
    dx: number | string;
    dy: number | string;
    text: any;
    x: any;
    y: any;
}
export interface AxisClass<T> {
    type: "time" | "quant" | "categorical";
    validate: Accessor<any, boolean>;
    compute: () => void;
    computed: AxisComputed;
    computeAligned?: (computed: Object<any>) => void;
    computeInitial?: () => Object<any>;
    draw: () => void;
    interval?: any;
    isXAxis: boolean;
    previous: AxisComputed;
    update: (options: AxisOptions, data: T[]) => void;
    close: () => void;
}
export interface Data {
    series?: SeriesData;
    axes?: AxesData;
}
export interface DataAccessors {
    series: Accessor<Data, SeriesData>;
    axes: Accessor<Data, AxesData>;
}
export interface AccessorsObject {
    data: DataAccessors;
    series: SeriesAccessors;
}
export interface Computed {
    axes: Object<any>;
    canvas: Object<any>;
    focus: Object<any>;
    series: Object<any>;
}
export interface LegendDatum {
    label: string;
    color: string;
}
export interface DataForLegends {
    top: {
        left: LegendDatum[];
        right: LegendDatum[];
    };
    bottom: {
        left: LegendDatum[];
    };
}
export interface HoverPayload {
}
export declare type Focus = Focus<HoverPayload>;
export interface Components {
    axes: any;
    legends: Legend;
}
export declare type ClipPath = "drawing_clip" | "yrules_clip" | "xyrules_clip";
export declare type SeriesElements = [RendererType, ClipPath][];
export declare type Facade = Facade<ChartConfig, AccessorsObject, Computed, Components, Data>;
export interface MousePosition {
    x: number;
    y: number;
}
