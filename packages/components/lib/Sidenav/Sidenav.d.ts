/// <reference types="react" />
import * as React from "react";
import SidenavHeader from "./SidenavHeader";
import SidenavItem from "./SidenavItem";
export interface IProps {
    id?: string | number;
    css?: {};
    className?: string;
    children?: React.ReactNode;
    color?: string;
    expandOnHover?: boolean;
    expandedWidth?: number;
    width?: number;
    fix?: boolean;
}
export interface IState {
    isHovered: boolean;
}
declare class Sidenav extends React.Component<IProps, IState> {
    state: {
        isHovered: boolean;
    };
    render(): JSX.Element;
}
export default Sidenav;
export { SidenavHeader, SidenavItem };
