/// <reference types="react" />
import { CSSProperties } from "glamorous";
import { Theme } from "@operational/theme";
export declare type WithTheme = {
    theme: Theme;
};
export interface Props {
    name: string;
    title?: string;
    showName?: boolean;
    hideInitials?: boolean;
    photo?: string;
    css?: CSSProperties | (<T>(props: T & WithTheme) => CSSProperties);
    className?: string;
    color?: string;
    assignColor?: boolean;
}
declare const Avatar: (props: Props) => JSX.Element;
export default Avatar;
