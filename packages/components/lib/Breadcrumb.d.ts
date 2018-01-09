/// <reference types="react" />
import * as React from "react";
import { ReactFeatherIconName } from "./ReactFeather";
export interface IProps {
    className?: string;
    css?: {};
    children?: React.ReactNode;
    icon?: ReactFeatherIconName | React.ReactNode;
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;
