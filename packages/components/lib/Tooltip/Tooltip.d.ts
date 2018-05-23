/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    css?: Css;
    className?: string;
    children?: React.ReactNode;
    /** Smart-positioned tooltip, with positioning reversed so it doesn't flow out of the window's bounding box. Currently works for left and top-positioned tooltips. */
    smart?: boolean;
    /** Top-positioned tooltip */
    top?: boolean;
    /** Left-positioned tooltip */
    left?: boolean;
    /** Right-positioned tooltip */
    right?: boolean;
    /** Bottom-positioned tooltip */
    bottom?: boolean;
}
export interface State {
    bbTop: number;
    bbBottom: number;
    bbLeft: number;
    bbRight: number;
}
declare class Tooltip extends React.Component<Props, State> {
    state: {
        bbTop: number;
        bbLeft: number;
        bbRight: number;
        bbBottom: number;
    };
    containerNode: HTMLElement;
    render(): JSX.Element;
    componentDidMount(): void;
}
export default Tooltip;
