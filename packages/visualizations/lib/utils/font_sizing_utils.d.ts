import { Selection } from "d3-selection";
export declare const stepFunction: (element: Selection<any, any, any, any>, availableWidth: number) => (x: number) => number;
export declare const approxZero: (y: (x: number) => number, initialX: number) => number;
