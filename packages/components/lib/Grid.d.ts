/// <reference types="react" />
import * as React from "react";
export declare type GridType = "3x2" | "1x1" | "2x2" | "IDE";
export interface Props {
    type?: GridType;
    children?: React.ReactNode;
}
declare const Grid: (props: Props) => JSX.Element;
export default Grid;
