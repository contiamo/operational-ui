/// <reference types="react" />
import * as React from "react";
export declare type Dimension = string | number;
export interface Props {
    id?: string | number;
    css?: any;
    className?: string;
    children?: React.ReactNode;
    rows?: Dimension[];
    columns?: Dimension[];
    gap?: number;
}
declare const Grid: React.SFC<Props>;
export default Grid;
