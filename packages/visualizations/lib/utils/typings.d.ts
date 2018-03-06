import EventEmitter from "./event_bus";
import { IChartStateReadOnly } from "./state_handler";
import * as d3 from "d3-selection";
export declare type Partial<T> = {
    [P in keyof T]?: T[P];
};
export interface IObject {
    [key: string]: any;
}
export declare type TStateWriter = (propertyPath: string | string[], value: any) => void;
export declare type TSeriesEl = d3.Selection<Element, any, Window, any>;
export declare type TD3Selection = d3.Selection<any, any, any, any>;
export declare type IEvents = EventEmitter;
export declare type Datum = {};
export interface IChartStateObject {
    data: Datum[] | IObject;
    config: IObject;
    accessors: any;
    computed: IObject;
}
export declare type IState = IChartStateReadOnly<IChartStateObject>;
export interface FocusClass<FocusPoint, Datum> {
    onElementHover: (payload: {
        focusPoint: FocusPoint;
        d: Datum;
        hideLabel?: boolean;
    }) => void;
    onElementOut: () => void;
    onMouseLeave: () => void;
    remove: () => void;
}
