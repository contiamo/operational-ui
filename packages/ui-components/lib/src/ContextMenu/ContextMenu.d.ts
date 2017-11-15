/// <reference types="react" />
import * as React from "react";
import ContextMenuItem from "./ContextMenuItem";
export interface IProps {
    key?: string | number;
    css?: {};
    className?: string;
    children: React.ReactNode;
    expandOnHover?: boolean;
}
export interface IState {
    isHovered: boolean;
    isActive: boolean;
}
declare class ContextMenu extends React.Component<IProps, IState> {
    state: {
        isHovered: boolean;
        isActive: boolean;
    };
    containerNode: any;
    menuContainerNode: any;
    outsideClickHandler: any;
    handleClick(ev: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default ContextMenu;
export { ContextMenuItem };
