/// <reference types="react" />
export declare type BrandIconName = "OperationalUI" | "Components" | "Blocks" | "Visualizations" | "Documentation" | "Labs";
export interface IProps {
    size?: number;
    color?: string;
    rotation?: number;
}
export declare const OperationalUI: (props: IProps) => JSX.Element;
export declare const Components: (props: IProps) => JSX.Element;
export declare const Blocks: (props: IProps) => JSX.Element;
export declare const Visualizations: (props: IProps) => JSX.Element;
export declare const Documentation: (props: IProps) => JSX.Element;
export declare const Labs: (props: IProps) => JSX.Element;
