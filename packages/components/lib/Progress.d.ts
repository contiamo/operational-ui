/// <reference types="react" />
import { Css } from "./types";
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
    error?: string;
    onRetry?: () => void;
    fadeParent?: boolean;
}
declare const Progress: (props: Props) => JSX.Element;
export default Progress;
