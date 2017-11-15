/// <reference types="react" />
import * as React from "react";
import SideNavigationHeader from "./Header/SideNavigationHeader";
import SideNavigationItem from "./Item/SideNavigationItem";
import SideNavigationLink from "./Link/SideNavigationLink";
export interface IProps {
    key?: string | number;
    css?: {};
    className?: string;
    children?: React.ReactNode;
    color?: string;
    expandOnHover?: boolean;
    expandedWidth?: number;
    width?: number;
    fix?: boolean;
}
declare const SideNavigation: React.SFC<IProps>;
export default SideNavigation;
export { SideNavigationHeader, SideNavigationItem, SideNavigationLink };
