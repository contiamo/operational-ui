/// <reference types="react" />
import { Css } from "./types";
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
    children: any;
}
declare const Timeline: (props: Props) => JSX.Element;
export default Timeline;
