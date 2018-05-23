/// <reference types="react" />
import { Css } from "../types";
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
}
declare const Spinner: (props: Props) => JSX.Element;
export default Spinner;
