/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    /** Id */
    id?: string;
    /** Glamorous CSS */
    css?: Css;
    /** Class name */
    className?: string;
    children?: React.ReactNode;
}
declare const ButtonGroup: (props: Props) => JSX.Element;
export default ButtonGroup;
