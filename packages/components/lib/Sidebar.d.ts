/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: string;
    css?: {};
    className?: string;
    children?: React.ReactNode;
}
declare const Sidebar: (props: Props) => JSX.Element;
export default Sidebar;
