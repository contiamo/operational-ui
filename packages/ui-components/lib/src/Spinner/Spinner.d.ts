/// <reference types="react" />
export interface IProps {
    key?: string | number;
    css?: any;
    className?: string;
    color?: string;
    size?: number | string;
    spinDuration?: number;
}
declare const Spinner: ({key, css, className, color, size, spinDuration}: IProps) => JSX.Element;
export default Spinner;
