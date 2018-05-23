/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
    /** Is it open? */
    open?: boolean;
    /** Toggle callback */
    onToggle?: () => void;
    /** Header label */
    label?: string;
    children?: React.ReactNode;
}
declare const SidebarHeader: (props: Props) => JSX.Element;
export default SidebarHeader;
