/// <reference types="react" />
import * as React from "react";
export interface IProps {
    css?: any;
    className?: string;
    size?: number;
    children?: React.ReactNode;
    onClick?: () => void;
    color?: string;
}
declare const PlusChip: React.SFC<IProps>;
export default PlusChip;
