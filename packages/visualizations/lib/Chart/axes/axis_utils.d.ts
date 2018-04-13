import { AxisClass, AxisPosition, ChartConfig, Computed, Object, XAxisConfig, YAxisConfig } from "../typings";
export declare const axisPosition: (position: AxisPosition, drawingDims: {
    width: number;
    height: number;
}) => [number, number];
export declare const insertElements: (el: any, position: AxisPosition, drawingDims: {
    width: number;
    height: number;
}) => any;
export declare const computeRange: (config: ChartConfig, computed: Computed, position: AxisPosition) => [number, number];
export declare const computeRequiredMargin: (axis: any, computedMargins: Object<number>, config: XAxisConfig | YAxisConfig, position: AxisPosition) => number;
export declare const alignAxes: (axes: Object<AxisClass<any>>) => Object<any>;
export declare const positionBackgroundRect: (el: any, duration: number) => void;
