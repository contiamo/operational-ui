export declare type TPath = string | string[];
export interface IReadOnlyState<T> {
    get(path: TPath): any;
}
export declare class State<T> {
    state: T;
    constructor(obj: T);
    get: (path: string | string[]) => any;
    set(path: TPath, value: any): void;
    merge(path: TPath, value?: Object): any;
    readOnly(): IReadOnlyState<T>;
    clone(): State<T>;
    private getPath(path);
    private setPath(path, value);
    private mergePath(path, value);
}
