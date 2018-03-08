export declare type Path = string | string[];
export interface ReadOnlyState<T> {
    get(path: Path): any;
}
export default class State<T> {
    state: T;
    constructor(obj: T);
    get: (path: string | string[]) => any;
    set(path: Path, value: any): void;
    merge(path: Path, value?: Object): any;
    readOnly(): ReadOnlyState<T>;
    clone(): State<T>;
    private getPath(path);
    private setPath(path, value);
    private mergePath(path, value);
}
