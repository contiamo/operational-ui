/// <reference types="react" />
import * as React from "react";
import { GlamorousComponent } from "glamorous";
import { Theme } from "../../theme";
export interface IProps {
    css?: any;
    className?: string;
    children: Node;
    onClick?: any;
    theme?: Theme;
}
declare const style: ({theme, color}: {
    theme: Theme;
    color?: string;
}) => {};
declare const SideNavigationLink: React.SFC<IProps>;
declare const _default: GlamorousComponent<IProps & object & Pick<{
    theme: Theme;
    color?: string;
}, "color">, {
    theme: Theme;
    color?: string;
}>;
export default _default;
export { SideNavigationLink, style };
