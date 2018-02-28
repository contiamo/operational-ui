/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
export interface Props {
    id?: number | string;
    css?: any;
    className?: string;
    selected?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
    color?: string;
}
export interface PropsWithTheme extends Props {
    theme: Theme;
}
declare const WrappedSelectOption: React.SFC<Props>;
export default WrappedSelectOption;
