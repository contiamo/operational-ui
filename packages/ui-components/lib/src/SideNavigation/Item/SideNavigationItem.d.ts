/// <reference types="react" />
import * as React from "react";
import { Theme } from "contiamo-ui-theme";
export interface IProps {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    active?: boolean;
    css?: {};
    theme?: Theme;
}
declare const SideNavigationItem: React.SFC<IProps>;
export default SideNavigationItem;
