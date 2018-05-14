/// <reference types="react" />
import * as React from "react";
import { Css } from "./types";
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
    open?: boolean;
    onToggle?: () => void;
    label?: string;
    children?: React.ReactNode;
}
declare const SidebarHeader: (props: Props) => JSX.Element;
export default SidebarHeader;
