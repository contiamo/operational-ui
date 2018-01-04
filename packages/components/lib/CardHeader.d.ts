/// <reference types="react" />
import * as React from "react";
export interface IProps {
    id?: string | number;
    css?: any;
    className?: string;
    children?: React.ReactNode;
    domId?: string;
}
declare const CardHeader: (props: IProps) => JSX.Element;
export default CardHeader;
