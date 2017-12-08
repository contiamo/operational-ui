/// <reference types="react" />
import * as React from "react";
export interface IProps {
    children?: React.ReactNode;
    disabled?: boolean;
    index?: number;
    title?: string;
}
declare const Tab: React.SFC<IProps>;
export default Tab;
