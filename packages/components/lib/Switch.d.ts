/// <reference types="react" />
import { Theme } from "@operational/theme";
export interface Props {
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
declare const _default: (props: Props) => JSX.Element;
export default _default;
