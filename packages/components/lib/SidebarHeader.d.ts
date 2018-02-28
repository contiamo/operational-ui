/// <reference types="react" />
export interface Props {
    id?: string | number;
    css?: {};
    className?: string;
    open?: boolean;
    onToggle?: () => void;
    label?: string;
    children?: any;
}
declare const _default: (props: Props) => JSX.Element;
export default _default;
