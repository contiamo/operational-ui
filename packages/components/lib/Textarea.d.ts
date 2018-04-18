/// <reference types="react" />
import { CSSProperties } from "glamorous";
import { Theme } from "@operational/theme";
export declare type ThemedCSSProperties = (a: {
    theme: Theme;
}) => CSSProperties;
export interface Props {
    id?: string;
    css?: CSSProperties | ThemedCSSProperties;
    className?: string;
    value: string;
    label?: string;
    onChange?: (val: string) => void;
    code?: boolean;
    hint?: string;
    error?: string;
    disabled?: boolean;
}
declare const Textarea: (props: Props) => JSX.Element;
export default Textarea;
