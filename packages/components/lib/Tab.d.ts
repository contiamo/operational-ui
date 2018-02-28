/// <reference types="react" />
import * as React from "react";
export interface Props {
    children?: React.ReactNode;
    disabled?: boolean;
    index?: number;
    title?: string;
}
declare const _default: ({children, ...rest}: Props) => JSX.Element;
export default _default;
