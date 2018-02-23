/// <reference types="react" />
import * as React from "react";
export interface IProps {
    id?: string | number;
    css?: any;
    className?: string;
    children?: React.ReactNode;
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;
