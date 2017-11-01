/// <reference types="react" />
import * as React from "react";
export interface IProps {
    css?: any;
    className?: string;
    children: Node;
    onClick?: any;
    active?: boolean;
}
declare const HeaderItem: React.SFC<IProps>;
export default HeaderItem;
