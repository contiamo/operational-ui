/// <reference types="react" />
import * as React from "react";
export interface IProps {
    css?: any;
    className?: string;
    children?: React.ReactNode;
    legend: string;
}
declare const Fieldset: ({children, legend}: IProps) => JSX.Element;
export default Fieldset;
