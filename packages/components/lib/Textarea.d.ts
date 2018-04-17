/// <reference types="react" />
import { CSSProperties } from "glamorous";
export interface Props {
    id?: string;
    css?: CSSProperties;
    className?: string;
    value: string;
    label?: string;
    onChange?: (val: string) => void;
    code?: boolean;
    hint?: string;
    error?: string;
}
declare const Textarea: (props: Props) => JSX.Element;
export default Textarea;
