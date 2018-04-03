/// <reference types="react" />
import * as React from "react";
import { IconName } from "./Icon";
export interface Props {
    id?: string;
    css?: any;
    className?: string;
    children: React.ReactNode;
    number?: number;
    label: string;
    fill: number;
    color?: string;
    barColor?: string;
    icon?: IconName;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}
declare const Breakdown: (props: Props) => JSX.Element;
export default Breakdown;
