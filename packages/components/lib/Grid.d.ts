/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: string;
    css?: {};
    className?: string;
    type?: string;
    children?: React.ReactNode;
}
declare const Grid: (props: Props) => JSX.Element;
export default Grid;
