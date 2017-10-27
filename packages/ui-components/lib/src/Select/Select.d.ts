export declare type Value = number | string;
export interface Option {
    label?: string;
    value: Value;
}
export interface IProps {
    id?: string;
    domId?: string;
    css?: any;
    className?: string;
    options: Option[];
    value: undefined | Value | Value[];
    filterable?: boolean;
    disabled?: boolean;
    onChange: (newValue: Value | Value[], changedItem?: Value) => void;
    onClick?: () => void;
    onFilter?: () => void;
    color?: string;
    placeholder?: string;
}
declare const _default: any;
export default _default;
