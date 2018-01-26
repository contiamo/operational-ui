/// <reference types="react" />
import * as React from "react";
export interface IProps {
    id?: string | number;
    css?: {};
    className?: string;
    children?: React.ReactNode;
    color?: string;
}
declare const _default: ({css, id, className, children, color}: IProps) => JSX.Element;
export default _default;
