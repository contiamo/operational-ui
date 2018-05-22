/// <reference types="react" />
import { Theme } from "@operational/theme";
import { Css } from "../types";
export interface Props {
    id?: string;
    css?: Css;
    /** Is the switch on? */
    on: boolean;
    /** A change handler. Passes the new `on` boolean */
    onChange?: (on: boolean) => void;
    className?: string;
}
export interface StyleProps {
    on: boolean;
    theme: Theme;
}
declare const Switch: (props: Props) => JSX.Element;
export default Switch;
