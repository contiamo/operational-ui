/// <reference types="react" />
import * as React from "react";
export interface Props {
    children?: React.ReactNode;
    disabled?: boolean;
    index?: number;
    title?: string;
}
declare const Tab: ({children, ...rest}: Props) => JSX.Element;
export default Tab;
