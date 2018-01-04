/// <reference types="react" />
export interface IProps {
    id?: string | number;
    css?: any;
    className?: string;
    children: Node;
    onClick?: any;
    active?: boolean;
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;
