/// <reference types="react" />
import * as React from "react";
import { Theme, ThemeColorName } from "../theme";
export declare type CustomColor = ThemeColorName | string;
export interface IProps {
    css?: {};
    className?: string;
    children?: React.ReactNode;
    color?: CustomColor;
    icon?: string;
    theme: Theme;
}
export interface IPropsWithTheme extends IProps {
    theme: Theme;
}
declare const WrappedTimelineItem: React.SFC<IProps>;
export default WrappedTimelineItem;
