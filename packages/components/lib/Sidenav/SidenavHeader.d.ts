/// <reference types="react" />
import * as React from "react";
import { ReactFeatherIconName } from "../Icon/ReactFeather";
export interface IProps {
    id?: string | number;
    css?: {};
    className?: string;
    children?: React.ReactNode;
    label: string;
    icon: ReactFeatherIconName | React.ReactNode;
    active?: boolean;
    expanded?: boolean;
    onClick?: () => void;
}
declare const SidenavHeader: (props: IProps) => JSX.Element;
export default SidenavHeader;
