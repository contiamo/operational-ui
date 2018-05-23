/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    /** Glamorous CSS */
    css?: Css;
    /** Class name */
    className?: string;
    children?: React.ReactNode;
}
declare const AvatarGroup: (props: Props) => JSX.Element;
export default AvatarGroup;
