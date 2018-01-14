/// <reference types="react" />
import * as React from "react";
export interface IProps {
    css?: {};
    className?: string;
    children?: React.ReactNode;
}
export interface IState {
    isExpanded: boolean;
}
export default class Record extends React.Component<IProps, IState> {
    state: {
        isExpanded: boolean;
    };
    render(): JSX.Element;
}
