/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    css?: Css;
    className?: string;
    title: string;
    controls?: React.ReactNode;
    children?: React.ReactNode;
}
declare const Record: (props: Props) => JSX.Element;
export default Record;
