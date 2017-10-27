/// <reference types="react" />
import * as React from "react";
import { GlamorousComponent } from "glamorous";
import { Theme } from "../../theme";
export interface IProps {
    className?: string;
    children?: React.ReactNode;
    to?: string;
    onClick?: () => void;
    symbol?: string;
    theme?: Theme;
    color?: string;
    disabled?: boolean;
    tooltip?: string;
    active?: boolean;
}
declare const style: {};
declare const SidebarLink: React.SFC<IProps>;
declare const _default: GlamorousComponent<IProps & object, object>;
export default _default;
export { SidebarLink, style };
