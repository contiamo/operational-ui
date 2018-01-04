/// <reference types="react" />
import * as React from "react";
export interface IProps {
    style?: {};
    className?: string;
    facade: any;
    accessors?: any;
    data?: any;
    config?: any;
}
declare class VisualizationWrapper extends React.Component<IProps, {}> {
    viz: any;
    containerNode: HTMLElement;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    updateViz(): void;
    componentWillUnmount(): void;
}
export default VisualizationWrapper;
