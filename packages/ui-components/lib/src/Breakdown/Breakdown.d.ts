/// <reference types="react" />
import * as React from "react";
import { ReactFeatherIconName } from "../Icon/ReactFeather";
export interface IProps {
    css?: any;
    className?: string;
    key?: string | number;
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
declare const _default: ({css, key, className, children, color, label, fill, number, onClick, onMouseEnter, onMouseLeave}: IProps) => JSX.Element;
export default _default;
