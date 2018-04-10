/// <reference types="react" />
import * as React from "react";
export interface Props {
    css?: {};
    className?: string;
    children?: React.ReactNode;
    columns: string[];
    rows: ((string | React.ReactNode)[])[];
    onRowClick?: (index: number) => void;
}
declare const Table: (props: Props) => JSX.Element;
export default Table;
