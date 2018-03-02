/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: string | number;
    css?: {};
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    active?: boolean;
}
declare const SidebarItem: (props: Props) => JSX.Element;
export default SidebarItem;
