import { Css } from "./types";
export interface Props {
    id?: string;
    css?: Css;
    className?: {};
    options: string[];
    selected: string[];
    onChange?: (newOptions: string[]) => void;
}
declare const _default: any;
export default _default;
