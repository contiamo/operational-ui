/// <reference types="react" />
export interface Props {
    value: string;
    label?: string;
    onChange?: (val: string) => void;
    css?: {};
}
declare const Textarea: (props: Props) => JSX.Element;
export default Textarea;
