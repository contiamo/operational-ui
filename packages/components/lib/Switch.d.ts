/// <reference types="react" />
import { Theme } from "@operational/theme";
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
declare const _default: (props: IProps) => JSX.Element;
export default _default;
