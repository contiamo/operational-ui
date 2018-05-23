/// <reference types="react" />
import { Css } from "../types";
export interface Props {
    css?: Css;
    className?: string;
    /** Text displayed when the input field has no value. */
    placeholder?: string;
    /** The name used to refer to the input, for forms. */
    name?: string;
    /** The current value of the input field. You must always supply this from the parent component, as per https://facebook.github.io/react/docs/forms.html#controlled-components. */
    value?: string;
    id?: string;
    /** Specifies the id that should be used when hooking up label for attributes with input id attributes, if a label is present. */
    labelId?: string;
    /** Label text, rendering the input inside a tag if specified. The `labelId` props is responsible for specifying for and id attributes. */
    label?: string;
    inputRef?: (node: any) => void;
    /** Callback called when the input changes, with the new value as a string. This is used to update the value in the parent component, as per https://facebook.github.io/react/docs/forms.html#controlled-components. */
    onChange?: (newVal: string) => void;
    onFocus?: (ev: any) => void;
    onBlur?: (ev: any) => void;
    type?: string;
    children?: string;
    autoComplete?: string;
    error?: string;
    hint?: string;
    /** Disabled input */
    disabled?: boolean;
    onToggle?: () => void;
}
declare const Input: (props: Props) => JSX.Element;
export default Input;
