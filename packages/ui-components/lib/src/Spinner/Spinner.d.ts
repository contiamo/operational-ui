/// <reference types="react" />
export interface IProps {
    id?: string | number;
    css?: any;
    className?: string;
    color?: string;
    size?: number | string;
    spinDuration?: number;
}
declare const Spinner: (props: IProps) => JSX.Element;
export default Spinner;
