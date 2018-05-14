/// <reference types="react" />
import * as React from "react";
import { Css } from "./types";
export interface Props {
    css?: Css;
    className?: string;
    children?: React.ReactNode;
}
declare const AvatarGroup: (props: Props) => JSX.Element;
export default AvatarGroup;
