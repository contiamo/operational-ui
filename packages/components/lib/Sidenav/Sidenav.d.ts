/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    id?: string;
    css?: Css;
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
