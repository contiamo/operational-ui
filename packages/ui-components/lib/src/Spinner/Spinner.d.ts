export interface IProps {
    css?: any;
    className?: string;
    color?: string;
    size?: number | string;
    spinDuration?: number;
}
declare const Spinner: ({css, className, color, size, spinDuration}: IProps) => JSX.Element;
export default Spinner;
