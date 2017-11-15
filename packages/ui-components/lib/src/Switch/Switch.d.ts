/// <reference types="react" />
import * as React from "react";
import { Theme } from "contiamo-ui-theme";
export interface IProps {
    key?: string | number;
    on: boolean;
    onChange: (on: boolean) => void;
    className?: string;
    style?: any;
}
export interface IStyleProps {
    on: boolean;
    theme: Theme;
}
declare const Switch: React.SFC<IProps>;
export default Switch;
