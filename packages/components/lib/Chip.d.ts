/// <reference types="react" />
import * as React from "react";
export interface IProps {
    id?: string | number;
    css?: {};
    color?: string;
    onClick?: () => void;
    onIconClick?: () => void;
    className?: string;
    children: React.ReactNode;
    icon?: string | React.ReactNode;
}
declare const Chip: (props: IProps) => JSX.Element;
export default Chip;
