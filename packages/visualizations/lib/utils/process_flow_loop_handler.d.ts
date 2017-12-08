export declare type TPath = string[];
export declare type TNodesList = string[];
export interface IJourney {
    path: TPath;
    size: number;
}
export interface INode {
    linkedToFrom: string[];
}
export interface INodes {
    [id: string]: INode;
}
declare const _default: (journeys: IJourney[]) => IJourney[];
export default _default;
