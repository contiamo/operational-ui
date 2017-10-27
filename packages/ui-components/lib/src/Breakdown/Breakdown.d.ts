/// <reference types="react" />
import * as React from "react";
export interface IProps {
    css?: any;
    className?: string;
    children: React.ReactNode;
    number?: number;
    label: string;
    fill: number;
    color?: string;
    icon?: ReactFeatherIconName;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}
declare const _default: ({css, className, children, color, label, fill, number, onClick, onMouseEnter, onMouseLeave}: IProps) => JSX.Element;
export default _default;
