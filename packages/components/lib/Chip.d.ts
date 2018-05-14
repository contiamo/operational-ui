/// <reference types="react" />
import * as React from "react";
import { Css } from "./types";
export interface Props {
    id?: string;
    css?: Css;
    color?: string;
    onClick?: () => void;
    onIconClick?: () => void;
    className?: string;
    children: React.ReactNode;
    icon?: string | React.ReactNode;
}
declare const Chip: (props: Props) => JSX.Element;
export default Chip;
