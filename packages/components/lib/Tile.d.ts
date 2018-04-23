/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: string;
    css?: any;
    className?: string;
    label?: string;
    children: React.ReactNode;
}
declare const Tile: (props: Props) => JSX.Element;
export default Tile;
