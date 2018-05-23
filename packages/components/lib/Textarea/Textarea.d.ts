/// <reference types="react" />
import { Css } from "../types";
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
    /** Controlled value of the field */
    value: string;
    /** Label of the field */
    label?: string;
    /** OnChange handler */
    onChange?: (val: string) => void;
    /** Change the font to monospace to better display of code */
    code?: boolean;
    /** Text for a hint */
    hint?: string;
    /** Error text */
    error?: string;
    /** Is it disabled? */
    disabled?: boolean;
}
declare const Textarea: (props: Props) => JSX.Element;
export default Textarea;
