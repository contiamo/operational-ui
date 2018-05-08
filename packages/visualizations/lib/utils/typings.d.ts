export declare type Partial<T> = {
    [P in keyof T]?: T[P];
};
export interface Object<T> {
    [key: string]: T;
}
import { Selection } from "d3-selection";
import { Transition } from "d3-transition";
export declare type SeriesEl = Selection<Element, any, Window, any>;
export declare type D3Selection = Selection<any, any, any, any>;
export declare type D3Transition = Transition<any, any, any, any>;
import EventEmitter from "./event_bus";
export declare type EventBus = EventEmitter;
export declare type Accessor<D, T> = (d: D) => T;
export interface Accessors<D> {
    [key: string]: Accessor<D, any>;
}
import { ChartStateReadOnly } from "./state_handler";
export { StateWriter } from "./state_handler";
export declare type State = ChartStateReadOnly<ChartStateObject>;
export interface ChartStateObject {
    data: any;
    config: Object<any>;
    accessors: any;
    computed: Object<any>;
}
export interface Config {
    duration: number;
    height: number;
    hidden: boolean;
    uid: string;
    visualizationName: string;
    width: number;
    [key: string]: any;
}
export interface Focus<HoverPayload> {
    remove: () => void;
}
export interface Legend {
    draw: () => void;
    remove: () => void;
}
export interface Canvas {
    draw: () => void;
    elementFor: (component: string) => any;
    remove: () => void;
}
export interface Facade<Config, AccessorsObject, Computed, Components, Data> {
    data: (data?: Data) => Data;
    config: (config?: Partial<Config>) => Config;
    accessors: (type: string, accessors: Accessors<any>) => Accessors<any>;
    on: (event: string, handler: any) => void;
    off: (event: string, handler: any) => void;
    draw: () => Element;
    close: () => void;
}
export interface ComponentHoverPayload {
    component: D3Selection;
    options: Object<any>;
}
export interface ComponentConfigOptions {
    options: Object<any>;
    seriesType?: string;
    type: "series" | "config";
}
export interface SeriesManager {
    assignData: () => void;
    draw: () => void;
}
