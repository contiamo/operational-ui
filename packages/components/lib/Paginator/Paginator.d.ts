/// <reference types="react" />
import { Css } from "../types";
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
    /** Disable the component */
    disabled?: boolean;
    /** Function to be executed after changing page */
    onChange?: (page: number) => void;
    maxVisible?: number;
    /** Index of the current selected page */
    page?: number;
    /** Total number of pages */
    pageCount: number;
}
declare const Paginator: ({ maxVisible, onChange, pageCount, page, id, css, className }: Props) => JSX.Element;
export default Paginator;
