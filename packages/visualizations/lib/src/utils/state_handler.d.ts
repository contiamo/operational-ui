import { State, TPath, IReadOnlyState } from "./state";
export declare type Data = Array<any> | Object;
export interface ChartStateObj {
    data: Data;
    config: Object;
    accessors: Object;
    computed: Object;
}
export declare type Partial<T> = {
    [P in keyof T]?: T[P];
};
export interface IChartState<T> {
    current: State<T>;
    previous: State<T>;
}
export interface IChartStateReadOnly<T> {
    current: IReadOnlyState<T>;
    previous: IReadOnlyState<T>;
}
declare class StateHandler {
    state: IChartState<ChartStateObj>;
    constructor(obj?: Partial<ChartStateObj>);
    captureState(): void;
    readOnly(): IChartStateReadOnly<ChartStateObj>;
    data(data?: Data): any;
    hasData(): boolean;
    config(config?: Object): any;
    accessors(type: string, accessors?: Object): any;
    computedWriter(namespace: TPath): (path: string | string[], value: any) => void;
}
export default StateHandler;
