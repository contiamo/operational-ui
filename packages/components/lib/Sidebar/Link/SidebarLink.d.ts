/// <reference types="react" />
import * as React from "react";
import { GlamorousComponent } from "glamorous";
import { Theme } from "@operational/theme";
export interface IProps {
    id?: string | number;
    style?: {};
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
declare const style: ({theme, color, disabled, active}: IProps) => {};
declare const SidebarLink: React.SFC<IProps>;
declare const _default: GlamorousComponent<IProps & object & Pick<{
    theme: any;
}, never>, {
    theme: any;
}>;
export default _default;
export { SidebarLink, style };
