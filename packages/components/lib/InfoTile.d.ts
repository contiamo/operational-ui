/// <reference types="react" />
import * as React from "react";
import { ReactFeatherIconName } from "./ReactFeather";
export interface IProps {
    id?: string | number;
    css?: any;
    className?: string;
    icon?: ReactFeatherIconName;
    onAction?: () => void;
    label?: string;
    children: React.ReactNode;
    color?: string;
}
declare const InfoTile: (props: IProps) => JSX.Element;
export default InfoTile;
