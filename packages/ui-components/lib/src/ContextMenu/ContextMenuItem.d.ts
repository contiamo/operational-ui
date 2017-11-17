/// <reference types="react" />
export interface IProps {
    id?: string | number;
    css?: any;
    className?: string;
    children?: any;
    onClick?: () => void;
}
declare const ContextMenuItem: (props: IProps) => JSX.Element;
export default ContextMenuItem;
