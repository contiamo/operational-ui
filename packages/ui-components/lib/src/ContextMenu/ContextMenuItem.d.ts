/// <reference types="react" />
export interface IProps {
    key?: string | number;
    css?: any;
    className?: string;
    children?: any;
    onClick?: () => void;
}
declare const ContextMenuItem: ({key, css, className, onClick, children}: IProps) => JSX.Element;
export default ContextMenuItem;
