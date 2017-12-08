/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
export interface IOption {
    id: number;
    label: string;
    value: any;
}
export interface IProps {
    id?: string | number;
    css?: {};
    className?: string;
    children: React.ReactNode;
    options?: IOption[];
    value?: string;
    onChange?: (option: IOption) => void;
    theme?: Theme;
}
export interface IState {
    isHovered: boolean;
    isOpen: boolean;
}
declare class SideNavigationHeader extends React.Component<IProps, IState> {
    static defaultProps: {
        options: IOption[];
    };
    state: {
        isOpen: boolean;
        isHovered: boolean;
    };
    onChange(option: IOption): void;
    labelFor(value: string): string;
    displayDropdown(): JSX.Element;
    render(): JSX.Element;
}
export default SideNavigationHeader;
