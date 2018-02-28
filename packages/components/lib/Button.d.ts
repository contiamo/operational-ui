/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
export interface IStyleProps {
    theme?: Theme;
    color?: string;
    active?: boolean;
    disabled?: boolean;
    condensed?: boolean;
}
export interface Props {
    id?: string | number;
    css?: any;
    className?: string;
    onClick?: any;
    type?: string;
    children?: React.ReactNode;
    color?: string;
    active?: boolean;
    disabled?: boolean;
    condensed?: boolean;
}
declare const _default: (props: Props) => JSX.Element;
export default _default;
