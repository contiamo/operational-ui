/// <reference types="react" />
import * as React from "react";
export interface Props {
    onClear?: (id: string) => void;
    children?: React.ReactNode;
}
export interface State {
    isExpanded: boolean;
}
declare class Filter extends React.Component<Props, State> {
    state: State;
    render(): JSX.Element;
}
export default Filter;
