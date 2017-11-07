/// <reference types="react" />
import * as React from "react";
import { ReactFeatherIconName } from "../Icon/ReactFeather";
export interface IProps {
    css?: any;
    className?: string;
    icon?: ReactFeatherIconName;
    onAction?: () => void;
    label?: string;
    children: React.ReactNode;
    color?: string;
}
declare const InfoTile: React.SFC<IProps>;
export default InfoTile;
