/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    css?: Css;
    className?: string;
    children?: React.ReactNode;
    /** Table columns headings */
    columns: string[];
    /** Table rows as an array of cells */
    rows: ((string | React.ReactNode)[])[];
    __experimentalColumnCss?: Css[];
    __experimentalRowActions?: React.ReactNode[];
    /** Called on row click */
    onRowClick?: (row: (string | React.ReactNode)[], index: number) => void;
}
declare const Table: (props: Props) => JSX.Element;
export default Table;
