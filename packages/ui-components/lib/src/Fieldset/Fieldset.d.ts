/// <reference types="react" />
import * as React from "react";
export interface IProps {
    key?: string | number;
    css?: any;
    className?: string;
    children?: React.ReactNode;
    legend: string;
}
declare const Fieldset: ({css, className, key, children, legend}: IProps) => JSX.Element;
export default Fieldset;
