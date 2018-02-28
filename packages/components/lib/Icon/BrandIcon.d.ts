/// <reference types="react" />
export declare type BrandIconName = "OperationalUI" | "Components" | "Blocks" | "Visualizations" | "Documentation" | "Labs";
export interface Props {
    size?: number;
    color?: string;
    rotation?: number;
}
export declare const OperationalUI: (props: Props) => JSX.Element;
export declare const Components: (props: Props) => JSX.Element;
export declare const Blocks: (props: Props) => JSX.Element;
export declare const Visualizations: (props: Props) => JSX.Element;
export declare const Documentation: (props: Props) => JSX.Element;
export declare const Labs: (props: Props) => JSX.Element;
