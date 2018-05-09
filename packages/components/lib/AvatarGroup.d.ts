/// <reference types="react" />
import { CSSProperties } from "glamorous";
import { Theme } from "@operational/theme";
export declare type WithTheme = {
    theme: Theme;
};
export interface Props {
    people: {
        name: string;
        photo?: string;
    }[];
    size?: number;
    css?: (props: WithTheme) => CSSProperties | CSSProperties;
}
declare const AvatarGroup: ({ people, size, css }: Props) => JSX.Element;
export default AvatarGroup;
