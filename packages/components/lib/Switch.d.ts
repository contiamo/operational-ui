/// <reference types="react" />
import { Theme } from "@operational/theme";
import { Css } from "./types";
export interface Props {
    id?: string;
    css?: Css;
    on: boolean;
    onChange?: (on: boolean) => void;
    className?: string;
}
export interface StyleProps {
    on: boolean;
    theme: Theme;
}
declare const Switch: (props: Props) => JSX.Element;
export default Switch;
