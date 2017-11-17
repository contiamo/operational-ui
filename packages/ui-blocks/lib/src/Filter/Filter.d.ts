/// <reference types="react" />
import * as React from "react";
export interface IProps {
    children?: React.ReactNode;
}
export interface IState {
    isExpanded: boolean;
}
declare class Filter extends React.Component<IProps, IState> {
    state: IState;
    render(): JSX.Element;
}
export default Filter;
