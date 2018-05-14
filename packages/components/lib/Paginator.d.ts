/// <reference types="react" />
import { Css } from "./types";
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
    disabled?: boolean;
    onChange?: (page: number) => void;
    maxVisible?: number;
    page?: number;
    pageCount: number;
}
declare const Paginator: ({ maxVisible, onChange, pageCount, page, id, css, className }: Props) => JSX.Element;
export default Paginator;
