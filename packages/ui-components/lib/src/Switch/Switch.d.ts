/// <reference types="react" />
import { Theme } from "contiamo-ui-theme";
export interface IProps {
    id?: string | number;
    on: boolean;
    onChange: (on: boolean) => void;
    className?: string;
    style?: any;
}
export interface IStyleProps {
    on: boolean;
    theme: Theme;
}
declare const Switch: (props: IProps) => JSX.Element;
export default Switch;
