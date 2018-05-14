/// <reference types="react" />
import { Css } from "./types";
export interface Props {
    name: string;
    title?: string;
    showName?: boolean;
    hideInitials?: boolean;
    photo?: string;
    css?: Css;
    className?: string;
    color?: string;
    assignColor?: boolean;
}
declare const Avatar: (props: Props) => JSX.Element;
export default Avatar;
