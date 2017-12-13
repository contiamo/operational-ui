/// <reference types="react" />
import * as React from "react";
import { ReactFeatherIconName } from "../Icon/ReactFeather";
export interface IProps {
    id?: string | number;
    css?: {};
    className?: string;
    children?: React.ReactNode;
    label: string;
    icon: ReactFeatherIconName;
}
export interface IState {
    isExpanded: boolean;
}
declare class SidenavHeader extends React.Component<IProps, IState> {
    state: {
        isExpanded: boolean;
    };
    render(): JSX.Element;
}
export default SidenavHeader;
