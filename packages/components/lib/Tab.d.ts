/// <reference types="react" />
import * as React from "react";
export interface IProps {
    children?: React.ReactNode;
    disabled?: boolean;
    index?: number;
    title?: string;
}
declare const _default: ({children, ...rest}: IProps) => JSX.Element;
export default _default;
