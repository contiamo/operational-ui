/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
export interface Props {
    style?: {};
    className?: string;
    facade: any;
    accessors?: any;
    data?: any;
    config?: any;
}
export interface PropsWithTheme extends Props {
    theme: Theme;
}
declare const WrappedVisualizationWrapper: React.StatelessComponent<Props>;
export default WrappedVisualizationWrapper;
