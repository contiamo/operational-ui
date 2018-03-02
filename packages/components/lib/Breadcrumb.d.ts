/// <reference types="react" />
import * as React from "react";
import { IconName } from "./Icon";
export interface Props {
    className?: string;
    css?: {};
    children?: React.ReactNode;
    icon?: IconName | React.ReactNode;
}
declare const Breadcrumb: (props: Props) => JSX.Element;
export default Breadcrumb;
