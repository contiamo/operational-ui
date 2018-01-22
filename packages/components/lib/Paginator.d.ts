/// <reference types="react" />
export interface IProps {
    id?: string | number;
    css?: any;
    className?: string;
    activeColor?: string;
    disabled?: boolean;
    onChange: (page: number) => void;
    maxVisible?: number;
    page?: number;
    pageCount: number;
}
declare const _default: ({activeColor, maxVisible, onChange, pageCount, page, id, css, className}: IProps) => JSX.Element;
export default _default;
