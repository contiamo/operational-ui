export interface IProps {
    css?: any;
    className?: string;
    children?: any;
    onClick?: () => void;
}
declare const ContextMenuItem: ({css, className, onClick, children}: IProps) => JSX.Element;
export default ContextMenuItem;
