import { Theme } from "@operational/theme";
import { CSSProperties } from "glamorous";
export declare type WithTheme = {
    theme: Theme;
};
export declare type Css = CSSProperties | (<T>(props: T & WithTheme) => CSSProperties);
export declare type CssStatic = CSSProperties;
