/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    /** Id */
    id?: string;
    /** Glamorous CSS */
    css?: Css;
    /** Styling overrides for the menu's container */
    menuCss?: Css;
    /** Class name */
    className?: string;
    children: React.ReactNode;
    /** Specify whether the menu items are visible. Overrides internal open state that triggers on click. */
    open?: boolean;
    onClick?: () => void;
    /** Handles click events anywhere outside the context menu container, including menu items. */
    onOutsideClick?: () => void;
    /** Suppresses the default behavior of closing the context menu when one of its items is clicked. */
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
