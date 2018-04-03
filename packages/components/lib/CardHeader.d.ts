/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: string;
    css?: any;
    className?: string;
    children?: React.ReactNode;
}
declare const CardHeader: (props: Props) => JSX.Element;
export default CardHeader;
