/// <reference types="react" />
export interface IProps {
    id?: string | number;
    css?: {};
    className?: string;
    open?: boolean;
    onToggle?: () => void;
    label?: string;
    children?: any;
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;
