/// <reference types="react" />
export interface IProps {
    id?: string | number;
    className?: string;
    onClick?: () => void;
    active?: boolean;
    css?: {};
    label: string;
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;
