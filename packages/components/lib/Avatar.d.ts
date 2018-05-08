/// <reference types="react" />
import React from "react";
import { CSSProperties } from "glamorous";
import { Theme } from "@operational/theme";
export declare type WithTheme = {
    theme: Theme;
};
export interface AvatarProps {
    name: string;
    withName?: boolean;
    photo?: string;
    css?: CSSProperties | (<T>(props: T & WithTheme) => CSSProperties);
    size?: number;
}
declare const Avatar: ({ name, photo, css, withName, size }: AvatarProps) => React.ReactElement<AvatarProps>;
export default Avatar;
