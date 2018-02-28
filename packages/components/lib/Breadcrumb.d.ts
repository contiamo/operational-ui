/// <reference types="react" />
import * as React from "react";
import { IconName } from "./Icon";
export interface Props {
    className?: string;
    css?: {};
    children?: React.ReactNode;
    icon?: IconName | React.ReactNode;
}
declare const _default: (props: Props) => JSX.Element;
export default _default;
