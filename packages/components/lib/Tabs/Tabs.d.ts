/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
import { Css } from "../types";
export interface Props {
    css?: Css;
    className?: string;
    id?: string;
    /** Index of the active tab. */
    active?: number;
    /** Active color. It can be a hex value or a named theme color. */
    activeColor?: string;
    children?: React.ReactNode;
    /** Function to be called once the tab index changes. */
    onChange?: (index: number) => void;
}
export interface PropsWithTheme extends Props {
    theme: Theme;
}
declare const WrappedTabs: React.SFC<Props>;
export default WrappedTabs;
