/// <reference types="react" />
import * as React from "react";
export interface IProps {
    id?: string | number;
    css?: any;
    className?: string;
    size?: number;
    children?: React.ReactNode;
    onClick?: () => void;
    color?: string;
}
declare const PlusChip: (props: IProps) => JSX.Element;
export default PlusChip;
