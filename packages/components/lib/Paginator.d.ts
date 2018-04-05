/// <reference types="react" />
export interface Props {
    id?: string;
    css?: any;
    className?: string;
    activeColor?: string;
    disabled?: boolean;
    onChange?: (page: number) => void;
    maxVisible?: number;
    page?: number;
    pageCount: number;
}
declare const Paginator: ({activeColor, maxVisible, onChange, pageCount, page, id, css, className}: Props) => JSX.Element;
export default Paginator;
