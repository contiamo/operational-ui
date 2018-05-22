/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    css?: Css;
    className?: string;
    id?: string;
    /** The label of the tile */
    label?: string;
    children: React.ReactNode;
}
declare const Tile: (props: Props) => JSX.Element;
export default Tile;
