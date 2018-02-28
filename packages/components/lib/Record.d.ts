/// <reference types="react" />
import * as React from "react";
export interface Props {
    css?: {};
    className?: string;
    children?: React.ReactNode;
    controls?: React.ReactNode;
    initiallyExpanded?: boolean;
}
export interface State {
    isExpanded: boolean;
}
export default class Record extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
}
