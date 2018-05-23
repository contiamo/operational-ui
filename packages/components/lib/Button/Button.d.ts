/// <reference types="react" />
import * as React from "react";
import { Theme } from "@operational/theme";
import { Css } from "../types";
export interface IStyleProps {
    theme?: Theme;
    color?: string;
    active?: boolean;
    disabled?: boolean;
    condensed?: boolean;
}
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
    /** Invoked when you click on the button */
    onClick?: React.HTMLProps<HTMLButtonElement>["onClick"];
    type?: string;
    children?: React.ReactNode;
    /**
     * What color of button would you like? It can be a hex value or a named theme color
     * @default white
     */
    color?: string;
    /** Active state */
    active?: boolean;
    /** Disabled option */
    disabled?: boolean;
    /** Condensed option */
    condensed?: boolean;
}
declare const Button: (props: Props) => JSX.Element;
export default Button;
