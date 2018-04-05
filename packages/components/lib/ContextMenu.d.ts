/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: string;
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
declare class ContextMenu extends React.Component<Props, State> {
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
export default ContextMenu;
