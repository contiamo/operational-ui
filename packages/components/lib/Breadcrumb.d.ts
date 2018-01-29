/// <reference types="react" />
import * as React from "react";
import { IconName } from "./Icon";
export interface IProps {
    className?: string;
    css?: {};
    children?: React.ReactNode;
    icon?: IconName | React.ReactNode;
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;
