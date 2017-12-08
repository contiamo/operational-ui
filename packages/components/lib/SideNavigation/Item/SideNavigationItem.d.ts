/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
export interface IProps {
    id?: string | number;
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    active?: boolean;
    css?: any;
    theme?: Theme;
}
declare const SideNavigationItem: (props: IProps) => JSX.Element;
export default SideNavigationItem;
