/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
    children: React.ReactNode;
}
declare const Timeline: (props: Props) => JSX.Element;
export default Timeline;
