/// <reference types="react" />
import * as React from "react";
import Tab from "./Tab";
import { Theme } from "../theme";
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
export { WrappedTabs as Tabs, Tab };
