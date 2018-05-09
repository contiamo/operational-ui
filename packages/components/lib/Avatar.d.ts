/// <reference types="react" />
import { CSSProperties } from "glamorous";
import { Theme } from "@operational/theme";
export declare type WithTheme = {
    theme: Theme;
};
export interface Props {
    name: string;
    withName?: boolean;
    photo?: string;
    css?: CSSProperties | (<T>(props: T & WithTheme) => CSSProperties);
    className?: string;
    size?: number;
}
declare const Avatar: (props: Props) => JSX.Element;
export default Avatar;
