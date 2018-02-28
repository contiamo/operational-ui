/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: string | number;
    css?: {};
    menuCss?: {};
    className?: string;
    children: React.ReactNode;
    open?: boolean;
    onClick?: () => void;
    onOutsideClick?: () => void;
    keepOpenOnItemClick?: boolean;
}
export interface State {
    isOpen: boolean;
}
export default class ContextMenu extends React.Component<Props, State> {
    state: {
        isOpen: boolean;
    };
    containerNode: any;
    menuContainerNode: any;
    outsideClickHandler: any;
    handleClick: (ev: any) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
