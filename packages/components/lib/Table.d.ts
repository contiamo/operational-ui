/// <reference types="react" />
import * as React from "react";
export interface IProps {
    css?: {};
    className?: string;
    children?: React.ReactNode;
    columns: string[];
    rows: (string[])[];
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;
