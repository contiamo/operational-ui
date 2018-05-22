/// <reference types="react" />
import { Css } from "../types";
export interface Props {
    /** Name of the person */
    name: string;
    /** Title of the person */
    title?: string;
    /** Optionally display the full name next to the avatar */
    showName?: boolean;
    /** Hide initials if is true */
    hideInitials?: boolean;
    /** A URL to an image of the person */
    photo?: string;
    /** Glamorous CSS */
    css?: Css;
    /** Class name */
    className?: string;
    /** Color assigned to the avatar circle */
    color?: string;
    /** Automatically assign a deterministic color. (Invalidates `color` assignment)  */
    assignColor?: boolean;
}
declare const Avatar: (props: Props) => JSX.Element;
export default Avatar;
