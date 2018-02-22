/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
export interface IProps {
    style?: {};
    className?: string;
    facade: any;
    accessors?: any;
    data?: any;
    config?: any;
}
export interface IPropsWithTheme extends IProps {
    theme: Theme;
}
declare const WrappedVisualizationWrapper: React.StatelessComponent<IProps>;
export default WrappedVisualizationWrapper;
