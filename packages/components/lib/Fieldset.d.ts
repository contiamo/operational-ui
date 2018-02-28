/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: string | number;
    css?: any;
    className?: string;
    children?: React.ReactNode;
    legend: string;
}
declare const Fieldset: (props: Props) => JSX.Element;
export default Fieldset;
