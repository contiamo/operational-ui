/// <reference types="react" />
import * as React from "react";
import { Css } from "./types";
export interface Props {
    css?: Css;
    className?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    index?: number;
    title?: string;
}
declare const Tab: (props: Props) => JSX.Element;
export default Tab;
