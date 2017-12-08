import { IReadOnlyState, State, TPath } from "./state";
import { IAccessors, IChartStateObject, IObject, TStateWriter } from "./typings";
export interface IChartState<T> {
    current: State<T>;
    previous: State<T>;
}
export interface IChartStateReadOnly<T> {
    current: IReadOnlyState<T>;
    previous: IReadOnlyState<T>;
}
export declare class StateHandler<IConfig> {
    state: IChartState<IChartStateObject>;
    constructor(obj: IChartStateObject);
    captureState(): void;
    readOnly(): IChartStateReadOnly<IChartStateObject>;
    data(data?: any): any;
    hasData(): boolean;
    config(config?: Partial<IConfig>): IConfig;
    accessors(type: string, accessors?: IObject): IAccessors;
    computedWriter(namespace: TPath): TStateWriter;
}
