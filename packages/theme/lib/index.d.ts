export { expandColor } from "./utils";
export declare type ThemeColorName = "brand" | "info" | "success" | "warning" | "error" | "white" | "black" | "gray" | "lightGray" | "text" | "lightText" | "linkText" | "navBackground" | "background" | "lighterBackground" | "border" | "secondarySeparator" | "separator";
export interface ThemeColors {
    brand: string;
    info: string;
    success: string;
    warning: string;
    error: string;
    visualizationPalette: string[];
    white: string;
    black: string;
    gray: string;
    lightGray: string;
    background: string;
    lighterBackground: string;
    navBackground: string;
    text: string;
    lightText: string;
    linkText: string;
    border: string;
    inputBorder: string;
    separator: string;
}
export interface ThemeShadows {
    pressed: string;
    card: string;
    focus: string;
    popup: string;
}
export interface ThemeTypographyElement {
    fontSize: number;
    fontWeight: 100 | 300 | 400 | 600 | 700 | "normal" | "bold" | "bolder" | "lighter" | "initial" | "inherit";
    textTransform: string;
    letterSpacing: number | "normal";
    lineHeight: string;
    opacity?: number;
    color?: string;
    "&::before"?: {
        content: string;
    };
}
export interface ThemeTypography {
    title: ThemeTypographyElement;
    heading1: ThemeTypographyElement;
    heading2: ThemeTypographyElement;
    body: ThemeTypographyElement;
    small: ThemeTypographyElement;
}
export interface Theme {
    colors: ThemeColors;
    typography: ThemeTypography;
    fontFamily: string;
    spacing: number;
    unit: number;
    borderRadius: number;
    baseZIndex: number;
    shadows: ThemeShadows;
}
declare const operational: Theme;
export { operational };
