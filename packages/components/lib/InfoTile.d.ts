/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: string | number;
    css?: any;
    className?: string;
    label?: string;
    children: React.ReactNode;
}
declare const _default: (props: Props) => JSX.Element;
export default _default;
