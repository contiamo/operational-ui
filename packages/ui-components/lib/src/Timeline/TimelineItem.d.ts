/// <reference types="react" />
import * as React from "react";
import { Theme, ThemeColorName } from "contiamo-ui-theme";
export declare type CustomColor = ThemeColorName | string;
export interface IProps {
    id?: string | number;
    css?: {};
    className?: string;
    children?: React.ReactNode;
    color?: CustomColor;
    icon?: string;
}
export interface IPropsWithTheme extends IProps {
    theme: Theme;
}
declare const WrappedTimelineItem: React.SFC<IProps>;
export default WrappedTimelineItem;
