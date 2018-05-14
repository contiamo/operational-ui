/// <reference types="react" />
import * as React from "react";
import { IconName } from "./Icon";
import { Css } from "./types";
export interface Props {
    css?: Css;
    className?: string;
    children?: React.ReactNode;
    icon?: IconName | React.ReactNode;
}
declare const Breadcrumb: (props: Props) => JSX.Element;
export default Breadcrumb;
