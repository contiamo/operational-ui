/// <reference types="react" />
import * as React from "react";
import { Css } from "./types";
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    active?: boolean;
}
declare const SidebarItem: (props: Props) => JSX.Element;
export default SidebarItem;
