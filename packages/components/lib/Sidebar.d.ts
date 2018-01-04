/// <reference types="react" />
import * as React from "react";
import SidebarItem from "./SidebarItem";
import SidebarLink from "./SidebarLink";
export interface IProps {
    id?: string | number;
    css?: any;
    className?: string;
    children?: React.ReactNode;
}
declare const Sidebar: React.SFC<IProps>;
export default Sidebar;
export { Sidebar, SidebarItem, SidebarLink };
