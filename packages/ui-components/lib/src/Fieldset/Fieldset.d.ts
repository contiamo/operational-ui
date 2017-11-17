/// <reference types="react" />
import * as React from "react";
export interface IProps {
    id?: string | number;
    css?: any;
    className?: string;
    children?: React.ReactNode;
    legend: string;
}
declare const Fieldset: (props: IProps) => JSX.Element;
export default Fieldset;
