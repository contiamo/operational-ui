/// <reference types="react" />
import * as React from "react";
export interface IProps {
    id?: string | number;
    css?: {};
    className?: string;
    children?: React.ReactNode;
    color?: string;
    expanded?: boolean;
    expandOnHover?: boolean;
    expandedWidth?: number;
    width?: number;
}
export interface IState {
    isHovered: boolean;
}
export default class Sidenav extends React.Component<IProps, IState> {
    state: {
        isHovered: boolean;
    };
    render(): JSX.Element;
}
