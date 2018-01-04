/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
export interface IProps {
    id?: string | number;
    className?: string;
    css?: any;
    children: React.ReactNode;
    theme?: Theme;
    color?: string;
}
declare const Header: (props: IProps) => JSX.Element;
export default Header;
