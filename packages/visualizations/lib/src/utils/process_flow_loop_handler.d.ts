export declare type TPath = string[];
export interface IJourney {
    path: TPath;
    size: number;
}
declare const _default: (journeys: IJourney[]) => IJourney[];
export default _default;
