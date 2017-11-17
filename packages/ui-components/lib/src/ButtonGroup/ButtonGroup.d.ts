/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: string | number;
    css?: any;
    className?: string;
    children?: React.ReactNode;
}
declare const ButtonGroup: React.SFC<Props>;
export default ButtonGroup;
