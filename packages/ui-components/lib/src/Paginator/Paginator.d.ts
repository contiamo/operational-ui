/// <reference types="react" />
import * as React from "react";
export interface IProps {
    css?: any;
    className?: string;
    activeColor?: string;
    disabled?: boolean;
    onChange: (page: number) => void;
    maxVisible?: number;
    page?: number;
    pageCount: number;
}
declare const Paginator: React.SFC<IProps>;
export default Paginator;
