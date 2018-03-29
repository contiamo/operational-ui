/// <reference types="react" />
export declare type BrandIconName = "OperationalUI" | "Pantheon" | "Labs";
export interface Props {
    size?: number;
    color?: string;
    colored?: boolean;
    rotation?: number;
}
export declare const OperationalUI: (props: Props) => JSX.Element;
export declare const Labs: (props: Props) => JSX.Element;
export declare const Pantheon: (props: Props) => JSX.Element;
