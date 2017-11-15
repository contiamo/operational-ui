/// <reference types="react" />
import * as React from "react";
export declare type Dimension = string | number;
export interface IProps {
    key?: string | number;
    css?: any;
    className?: string;
    children?: React.ReactNode;
    rows?: Dimension[];
    columns?: Dimension[];
    gap?: number;
}
declare const Grid: React.SFC<IProps>;
export default Grid;
