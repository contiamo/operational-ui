/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: string;
    css?: {};
    className?: string;
    children?: React.ReactNode;
    expanded?: boolean;
    expandOnHover?: boolean;
}
export interface State {
    isHovered: boolean;
}
declare class Sidenav extends React.Component<Props, State> {
    state: {
        isHovered: boolean;
    };
    render(): JSX.Element;
}
export default Sidenav;
