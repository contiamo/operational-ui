/// <reference types="react" />
import * as React from "react";
import { Theme } from "contiamo-ui-theme";
import HeaderItem from "./HeaderItem";
import HeaderTitle from "./HeaderTitle";
import HeaderSeparator from "./HeaderSeparator";
export interface IProps {
    className?: string;
    css?: any;
    children: React.ReactNode;
    theme?: Theme;
    color?: string;
}
declare const Header: React.SFC<IProps>;
export default Header;
export { HeaderItem, HeaderSeparator, HeaderTitle };
