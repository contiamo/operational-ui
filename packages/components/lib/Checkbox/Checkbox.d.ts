/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
    options: string[];
    selected: string[];
    onChange?: (newOptions: string[]) => void;
}
declare const _default: React.StatelessComponent<{}>;
export default _default;
