/// <reference types="react" />
import * as React from "react";
export interface Props {
    css?: {};
    className?: string;
    children?: React.ReactNode;
    columns: string[];
    rows: ((string | React.ReactNode)[])[];
}
declare const _default: (props: Props) => JSX.Element;
export default _default;
