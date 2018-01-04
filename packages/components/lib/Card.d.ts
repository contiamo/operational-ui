/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
export interface IProps {
    id?: string | number;
    css?: any;
    className?: string;
    children: React.ReactNode;
    theme?: Theme;
    width?: number;
    padding?: number;
}
declare const Card: React.SFC<IProps>;
export default Card;
