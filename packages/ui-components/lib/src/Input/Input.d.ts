export interface IProps {
    key?: string | number;
    css?: any;
    className?: string;
    placeholder?: string;
    name?: string;
    value: string;
    id?: string;
    domId?: string;
    label?: string;
    inputRef?: (node: any) => void;
    onChange?: (newVal: string) => void;
    disabled?: boolean;
    onFocus?: (ev: any) => void;
    onBlur?: (ev: any) => void;
    children?: string;
}
declare const _default: any;
export default _default;
