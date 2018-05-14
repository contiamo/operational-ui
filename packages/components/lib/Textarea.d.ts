/// <reference types="react" />
import { Css } from "./types";
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
    value: string;
    label?: string;
    onChange?: (val: string) => void;
    code?: boolean;
    hint?: string;
    error?: string;
    disabled?: boolean;
}
declare const Textarea: (props: Props) => JSX.Element;
export default Textarea;
