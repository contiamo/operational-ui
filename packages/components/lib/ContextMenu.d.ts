/// <reference types="react" />
import * as React from "react";
export interface IProps {
    id?: string | number;
    css?: {};
    menuCss?: {};
    className?: string;
    children: React.ReactNode;
    openOnHover?: boolean;
    keepOpenOnItemClick?: boolean;
}
export interface IState {
    isHovered: boolean;
    isOpen: boolean;
}
export default class ContextMenu extends React.Component<IProps, IState> {
    state: {
        isHovered: boolean;
        isOpen: boolean;
    };
    constructor(props: IProps);
    containerNode: any;
    menuContainerNode: any;
    outsideClickHandler: any;
    handleClick(ev: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
