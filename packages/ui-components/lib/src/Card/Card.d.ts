/// <reference types="react" />
import * as React from "react";
import CardHeader from "./CardHeader";
import { Theme } from "../theme";
export interface IProps {
    css?: any;
    className?: string;
    children: React.ReactNode;
    theme?: Theme;
    width?: number;
    padding?: number;
}
declare const Card: React.SFC<IProps>;
export default Card;
export { CardHeader };
