/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
import * as BrandIcons from "./Icon/BrandIcon";
import { ReactFeatherIconName } from "./Icon/ReactFeatherIcon";
export declare type IconName = ReactFeatherIconName | BrandIcons.BrandIconName;
export interface IProps {
    id?: string | number;
    name: IconName;
    size?: number;
    color?: string;
    rotation?: number;
}
export interface IPropsWithTheme extends IProps {
    theme: Theme;
}
declare const WrappedIcon: React.SFC<IProps>;
export default WrappedIcon;
