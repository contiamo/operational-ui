/// <reference types="react" />
import * as React from "react";
export interface Props {
    css?: {};
    className?: string;
    title: string;
    controls?: React.ReactNode;
    children?: React.ReactNode;
}
declare const Record: (props: Props) => JSX.Element;
export default Record;
