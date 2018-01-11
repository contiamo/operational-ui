/// <reference types="react" />
import * as React from "react";
export interface IProps {
    css?: {};
    className?: string;
    children?: React.ReactNode;
    color?: string;
    onClose?: () => void;
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;
