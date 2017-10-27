export declare type ThemeColorName = "info" | "success" | "warning" | "error" | "white" | "black" | "grey10" | "grey20" | "grey30" | "grey40" | "grey50" | "grey60" | "grey70" | "grey80" | "grey90";
export interface Palette {
    [key: string]: string;
    info: string;
    success: string;
    warning: string;
    error: string;
    white: string;
    black: string;
    grey10: string;
    grey20: string;
    grey30: string;
    grey40: string;
    grey50: string;
    grey60: string;
    grey70: string;
    grey80: string;
    grey90: string;
}
export interface UsageColors {
    bodyText: string;
    lightText: string;
    emphasizedText: string;
    contentBorder: string;
    bodyBackground: string;
    cardBackground: string;
    contentSeparatorLine: string;
    subContentSeparatorLine: string;
}
export interface ThemeColors {
    palette: Palette;
    usage: UsageColors;
}
export interface ThemeShadows {
    pressed: string;
    card: string;
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
    spacing: number;
    baseZIndex: number;
    shadows: ThemeShadows;
}
declare const defaultTheme: Theme;
export default defaultTheme;
