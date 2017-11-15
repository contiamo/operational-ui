/// <reference types="react" />
import * as React from "react";
export interface Props {
    css?: any;
    key?: string | number;
    className?: string;
    children?: React.ReactNode;
}
declare const ButtonGroup: React.SFC<Props>;
export default ButtonGroup;
