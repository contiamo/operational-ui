/// <reference types="react" />
import * as React from "react";
declare class VisualizationWrapper extends React.Component {
    viz: any;
    containerNode: HTMLElement;
    props: {
        facade: any;
        accessors?: any;
        data?: any;
        config?: any;
    };
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    updateViz(): void;
    componentWillUnmount(): void;
}
export default VisualizationWrapper;
