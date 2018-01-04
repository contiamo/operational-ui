/// <reference types="react" />
import * as React from "react";
import { ReactFeatherIconName } from "./ReactFeather";
export interface IProps {
    id?: string | number;
    css?: any;
    className?: string;
    children: React.ReactNode;
    number?: number;
    label: string;
    fill: number;
    color?: string;
    barColor?: string;
    icon?: ReactFeatherIconName;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;
