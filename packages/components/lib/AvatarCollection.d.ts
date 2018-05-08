/// <reference types="react" />
import { CSSProperties } from "glamorous";
import { Theme } from "@operational/theme";
export declare type WithTheme = {
    theme: Theme;
};
export interface AvatarCollectionProps {
    people: {
        name: string;
        photo?: string;
    }[];
    size?: number;
    css?: (props: WithTheme) => CSSProperties | CSSProperties;
}
declare const AvatarCollection: ({ people, size, css }: AvatarCollectionProps) => JSX.Element;
export default AvatarCollection;
