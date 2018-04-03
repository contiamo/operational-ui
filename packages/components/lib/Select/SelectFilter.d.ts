/// <reference types="react" />
export interface Props {
    id?: string | number;
    css?: any;
    className?: string;
    placeholder?: string;
    onChange?: (newVal: string) => void;
    color?: string;
}
declare const SelectFilter: (props: Props) => JSX.Element;
export default SelectFilter;
