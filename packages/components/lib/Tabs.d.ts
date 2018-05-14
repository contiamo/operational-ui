/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
import { Css } from "./types";
export interface Props {
    css?: Css;
    className?: string;
    id?: string;
    active?: number;
    activeColor?: string;
    children?: React.ReactNode;
    onChange?: (index: number) => void;
}
export interface PropsWithTheme extends Props {
    theme: Theme;
}
declare const WrappedTabs: React.SFC<Props>;
export default WrappedTabs;
