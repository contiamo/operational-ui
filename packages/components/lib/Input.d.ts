/// <reference types="react" />
import { CSSProperties } from "glamorous";
export interface Props {
    css?: CSSProperties;
    className?: string;
    placeholder?: string;
    name?: string;
    value?: string;
    id?: string;
    labelId?: string;
    label?: string;
    inputRef?: (node: any) => void;
    onChange?: (newVal: string) => void;
    onFocus?: (ev: any) => void;
    onBlur?: (ev: any) => void;
    type?: string;
    children?: string;
    autoComplete?: string;
    error?: string;
    hint?: string;
    disabled?: boolean;
    onToggle?: () => void;
}
declare const Input: (props: Props) => JSX.Element;
export default Input;
