/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
export interface IProps {
    active?: number;
    activeColor?: string;
    children?: React.ReactNode;
    onChange?: (index: number) => void;
}
export interface IPropsWithTheme extends IProps {
    theme: Theme;
}
declare const WrappedTabs: React.SFC<IProps>;
export default WrappedTabs;
