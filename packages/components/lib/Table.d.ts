/// <reference types="react" />
import * as React from "react";
import { Css } from "./types";
export interface Props {
    css?: Css;
    className?: string;
    children?: React.ReactNode;
    columns: string[];
    rows: ((string | React.ReactNode)[])[];
    __experimentalColumnCss?: Css[];
    __experimentalRowActions?: React.ReactNode[];
    onRowClick?: (row: (string | React.ReactNode)[], index: number) => void;
}
declare const Table: (props: Props) => JSX.Element;
export default Table;
