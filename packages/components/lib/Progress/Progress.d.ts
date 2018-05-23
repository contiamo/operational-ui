/// <reference types="react" />
import { Css } from "../types";
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
    /** Show an error instead of the progress */
    error?: string;
    /** Provide a button to retry the action to load */
    onRetry?: () => void;
    /** OnClose callback */
    onClose?: () => void;
}
declare const Progress: (props: Props) => JSX.Element;
export default Progress;
