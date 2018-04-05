/// <reference types="react" />
export interface Props {
    css?: {};
    className?: string;
    placeholder?: string;
    name?: string;
    value?: string;
    id?: string;
    labelId?: string;
    label?: string;
    inputRef?: (node: any) => void;
    onChange?: (newVal: string) => void;
    disabled?: boolean;
    onFocus?: (ev: any) => void;
    onBlur?: (ev: any) => void;
    type?: string;
    children?: string;
    autoComplete?: string;
}
declare const Input: (props: Props) => JSX.Element;
export default Input;
