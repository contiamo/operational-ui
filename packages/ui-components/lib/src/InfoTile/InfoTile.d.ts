/// <reference types="react" />
import * as React from "react";
export interface IProps {
    css?: any;
    className?: string;
    icon?: ReactFeatherIconName;
    onIconClick?: () => void;
    label?: string;
    children: React.ReactNode;
    color?: string;
}
declare const InfoTile: React.SFC<IProps>;
export default InfoTile;
