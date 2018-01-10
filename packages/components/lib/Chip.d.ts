/// <reference types="react" />
import * as React from "react";
export interface IProps {
    id?: string | number;
    css?: {};
    color?: string;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
    symbol?: string;
}
declare const Chip: (props: IProps) => JSX.Element;
export default Chip;
