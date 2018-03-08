import State, { ReadOnlyState, Path } from "./state";
import { Accessors, ChartStateObject } from "./typings";
export interface ChartState<T> {
    current: State<T>;
    previous: State<T>;
}
export interface ChartStateReadOnly<T> {
    current: ReadOnlyState<T>;
    previous: ReadOnlyState<T>;
}
export declare type StateWriter = (propertyPath: string | string[], value: any) => void;
export default class StateHandler<Config, Data> {
    state: ChartState<ChartStateObject>;
    constructor(obj: ChartStateObject);
    captureState(): void;
    readOnly(): ChartStateReadOnly<ChartStateObject>;
    data(data?: Data): any;
    hasData(): boolean;
    config(config?: Partial<Config>): Config;
    accessors(type: string, accessors?: Accessors<any>): any;
    computedWriter(namespace: Path): StateWriter;
}
