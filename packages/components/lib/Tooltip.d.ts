/// <reference types="react" />
import * as React from "react";
export interface IProps {
    css?: {};
    className?: string;
    children?: React.ReactNode;
    top?: boolean;
    left?: boolean;
    right?: boolean;
    bottom?: boolean;
}
export interface IState {
    bbTop: number;
    bbBottom: number;
    bbLeft: number;
    bbRight: number;
}
export default class Tooltip extends React.Component<IProps, IState> {
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
