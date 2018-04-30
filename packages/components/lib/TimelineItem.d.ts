/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: string;
    css?: {};
    className?: string;
    children?: React.ReactNode;
    color?: string;
}
declare const TimelineItem: ({ css, id, className, children, color }: Props) => JSX.Element;
export default TimelineItem;
