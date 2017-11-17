/// <reference types="react" />
import * as React from "react";
import { GlamorousComponent } from "glamorous";
import { Theme } from "contiamo-ui-theme";
export interface IProps {
    id?: string | number;
    style?: {};
    className?: string;
    label: string;
    children?: any;
    open?: boolean;
    onClick?: () => Promise<any>;
    tooltip?: string;
}
export interface IState {
    open: boolean;
    updating: boolean;
}
declare class SidebarItem extends React.Component<IProps, IState> {
    state: {
        open: boolean;
        updating: boolean;
    };
    componentWillMount(): void;
    toggle(): Promise<boolean>;
    render(): JSX.Element;
}
declare const _default: GlamorousComponent<IProps & object & Pick<{
    theme: Theme;
    children?: Node;
}, "children">, {
    theme: Theme;
    children?: Node;
}>;
export default _default;
export { SidebarItem };
