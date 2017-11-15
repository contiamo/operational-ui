/// <reference types="react" />
import * as React from "react";
export interface IProps {
    key?: string | number;
    css?: any;
    className?: string;
    children: Node;
    onClick?: any;
    active?: boolean;
}
declare const HeaderItem: React.SFC<IProps>;
export default HeaderItem;
