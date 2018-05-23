/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
    /** Either 'IDE', or of an `MxN` format, with `M` and `N` as integers. */
    type?: string;
    children?: React.ReactNode;
}
declare const Grid: React.SFC<Props>;
export default Grid;
