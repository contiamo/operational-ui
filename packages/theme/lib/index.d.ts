export { expandColor } from "./utils";
export declare type ThemeColorName = "brand" | "info" | "success" | "warning" | "error" | "white" | "black" | "gray10" | "gray20" | "gray30" | "gray40" | "gray50" | "gray60" | "gray70" | "gray80" | "gray90" | "background" | "bodyText" | "emphasizedText" | "lightText" | "linkText" | "cardBackground" | "border" | "sidenavBackground" | "secondarySeparator" | "separator";
export interface ThemeColors {
    brand: string;
    info: string;
    success: string;
    warning: string;
    error: string;
    visualizationPalette: string[];
    white: string;
    black: string;
    gray10: string;
    gray20: string;
    gray30: string;
    gray40: string;
    gray50: string;
    gray60: string;
    gray70: string;
    gray80: string;
    gray90: string;
    background: string;
    bodyText: string;
    emphasizedText: string;
    lightText: string;
    linkText: string;
    cardBackground: string;
    border: string;
    sidenavBackground: string;
    secondarySeparator: string;
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
    baseZIndex: number;
    shadows: ThemeShadows;
}
declare const operational: Theme;
export { operational };
