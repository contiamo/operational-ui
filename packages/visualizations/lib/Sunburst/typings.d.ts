import Breadcrumb from "./breadcrumb";
import Renderer from "./renderer";
import RootLabel from "./root_label";
import { IObject, FocusClass } from "../utils/typings";
export { IChartStateObject, IEvents, IObject, IState, Partial, TD3Selection, TSeriesEl, TStateWriter } from "../utils/typings";
export interface IConfig {
    arrowOffset: number;
    centerCircleRadius: number;
    disableAnimations: boolean;
    duration: number;
    height: number;
    hidden: boolean;
    maxRings: number;
    numberFormatter: (x: number) => string;
    outerBorderMargin: number;
    palette: string[];
    propagateColors: boolean;
    sort: boolean;
    uid: string;
    visualizationName: string;
    width: number;
    zoomNode?: IObject;
}
export declare type TDatum = IObject;
export interface IAccessors {
    data: {
        data: (d: IObject) => IObject;
    };
    series: {
        color: (d: TDatum) => string;
        name: (d: TDatum) => string;
        value: (d: TDatum) => number;
    };
}
export interface IComputedState {
    canvas: IObject;
    focus: IObject;
    renderer: IObject;
}
export interface IMousePosition {
    absolute: {
        x: number;
        y: number;
    };
    relative: {
        x: number;
        y: number;
    };
}
export interface Components {
    breadcrumb: Breadcrumb;
    focus: FocusClass<IObject, TDatum>;
    renderer: Renderer;
    rootLabel: RootLabel;
}
