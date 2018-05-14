/// <reference types="react" />
import { Css } from "./types";
export interface Props {
    id?: string;
    className?: string;
    onClick?: () => void;
    active?: boolean;
    css?: Css;
    label: string;
}
declare const SidenavItem: (props: Props) => JSX.Element;
export default SidenavItem;
