/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    id?: string;
    className?: string;
    css?: Css;
    children?: React.ReactNode;
}
declare const Header: (props: Props) => JSX.Element;
export default Header;
