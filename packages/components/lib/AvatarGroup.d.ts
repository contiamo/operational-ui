/// <reference types="react" />
import * as React from "react";
import { CSSProperties } from "glamorous";
import { Theme } from "@operational/theme";
export declare type WithTheme = {
    theme: Theme;
};
export interface Props {
    css?: (props: WithTheme) => CSSProperties | CSSProperties;
    className?: string;
    children?: React.ReactNode;
}
declare const AvatarGroup: (props: Props) => JSX.Element;
export default AvatarGroup;
