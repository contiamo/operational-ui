import { AxisClass, AxisPosition, Object } from "../typings";
export declare const axisPosition: (position: AxisPosition, drawingDims: {
    width: number;
    height: number;
}) => [number, number];
export declare const insertElements: (el: any, type: string, position: AxisPosition, drawingDims: {
    width: number;
    height: number;
}) => any;
export declare const computeRequiredMargin: (axis: any, computedMargins: Object<number>, configuredMargin: number, outerPadding: number, position: AxisPosition) => number;
export declare const alignAxes: (axes: Object<AxisClass<any>>) => Object<any>;
export declare const positionBackgroundRect: (el: any, duration: number) => void;
