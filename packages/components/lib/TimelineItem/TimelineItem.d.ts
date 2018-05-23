/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
    /** Content */
    children?: React.ReactNode;
    /** Color */
    color?: string;
}
declare const TimelineItem: ({ css, id, className, children, color }: Props) => JSX.Element;
export default TimelineItem;
