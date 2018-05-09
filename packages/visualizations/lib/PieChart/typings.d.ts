import { Arc, Pie, PieArcDatum } from "d3-shape";
import { Accessor, Config, Facade, Focus, Legend, Object, State } from "../utils/typings";
export { Accessor, Accessors, Canvas, ComponentConfigOptions, D3Selection, D3Transition, Dimensions, EventBus, Legend, Object, Partial, Position, SeriesEl, State, StateWriter } from "../utils/typings";
export declare type FocusElement = string;
export interface PieChartConfig extends Config {
    focusElement?: FocusElement;
    focusOffset: number;
    legend: true;
    maxWidth: number;
    maxLegendRatio: number;
    maxLegendWidth: number;
    maxTotalFontSize: number;
    minChartWithLegend: number;
    minWidth: number;
    minInnerRadius: number;
    minLegendWidth: number;
    minTotalFontSize: number;
    numberFormatter: (x: number) => string;
    outerBorderMargin: number;
    palette: string[];
    showComponentFocus: boolean;
}
export declare type Datum = {
    value?: number;
    key?: string;
    percentage?: number;
    unfilled?: boolean;
};
export declare type Data = Datum[];
export interface LegendDatum {
    label: string;
    color?: string;
    comparison?: boolean;
}
export interface DataAccessors {
    data: Accessor<any, Data>;
}
export interface SeriesAccessors {
    name: Accessor<Datum, string>;
    renderAs: Accessor<Datum, any>;
}
export interface AccessorsObject {
    data: DataAccessors;
    series: SeriesAccessors;
}
export declare type RendererAccessor<T> = Accessor<Datum | ComputedDatum, T>;
export interface RendererAccessors {
    key: RendererAccessor<string>;
    value: RendererAccessor<number>;
    color: RendererAccessor<string>;
}
export interface Computed {
    canvas: Object<any>;
    focus: Object<any>;
    series: Object<any>;
}
export interface DatumInfo {
    key: string;
    value: number;
    percentage: number;
}
export interface HoverPayload {
    focusPoint: {
        centroid: [number, number];
    };
    d: DatumInfo;
}
export declare type Focus = Focus<HoverPayload>;
export interface Components {
    focus: Focus<HoverPayload>;
    legend: Legend;
}
export declare type Facade = Facade<PieChartConfig, AccessorsObject, Computed, Components, Data>;
export interface RendererOptions {
    type: "donut" | "polar" | "gauge";
    accessors?: Object<Accessor<Datum, any>>;
    extent?: "semi" | "full";
    comparison?: Datum;
    target?: number;
}
export interface ComputedInitial {
    layout: Pie<any, any>;
    total: number;
    target?: number;
}
export interface ComputedArcs {
    arc: Arc<any, any>;
    arcOver: Arc<any, any>;
    rInner: number;
    rInnerHover: number;
    r: number;
    rHover: number;
}
export declare type ComputedDatum = PieArcDatum<Datum>;
export interface ComputedData extends ComputedInitial, ComputedArcs {
    comparison?: Datum;
    data: ComputedDatum[];
}
export interface Renderer {
    dataForLegend: () => LegendDatum[];
    draw: () => void;
    key: Accessor<Datum | ComputedDatum, string>;
    remove: () => void;
    setData: (data: Datum[]) => void;
    state: State;
    type: "donut" | "gauge" | "polar";
    updateOptions: (options: Object<any>) => void;
    value: Accessor<Datum | ComputedDatum, number>;
}
