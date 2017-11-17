/// <reference types="react" />
export interface IProps {
    id?: string | number;
    css?: any;
    className?: string;
    children: Node;
    onClick?: any;
    active?: boolean;
}
declare const HeaderItem: (props: IProps) => JSX.Element;
export default HeaderItem;
