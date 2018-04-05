/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: string;
    css?: any;
    className?: string;
    children?: React.ReactNode;
    legend: string;
}
declare const Fieldset: (props: Props) => JSX.Element;
export default Fieldset;
