/// <reference types="react" />
import * as React from "react";
import { Css } from "./types";
export interface Props {
    css?: Css;
    className?: string;
    children?: React.ReactNode;
    smart?: boolean;
    top?: boolean;
    left?: boolean;
    right?: boolean;
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
