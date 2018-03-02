/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: string | number;
    css?: any;
    className?: string;
    label?: string;
    children: React.ReactNode;
}
declare const InfoTile: (props: Props) => JSX.Element;
export default InfoTile;
