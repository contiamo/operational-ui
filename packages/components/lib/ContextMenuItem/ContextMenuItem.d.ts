/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
    children?: any;
    onClick?: () => void;
    __isContextMenuItem?: boolean;
}
declare const ContextMenuItem: React.SFC<Props>;
export default ContextMenuItem;
