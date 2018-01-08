/// <reference types="react" />
import * as React from "react";
export interface IProps {
    id?: string | number;
    className?: string;
    css?: any;
    children: React.ReactNode;
    color?: string;
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;
