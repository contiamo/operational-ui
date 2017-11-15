/// <reference types="react" />
import * as React from "react";
export interface IProps {
    key?: string | number;
    css?: any;
    className?: string;
    children?: React.ReactNode;
    id?: string;
}
declare const CardHeader: React.SFC<IProps>;
export default CardHeader;
