/// <reference types="react" />
import * as React from "react";
export interface Props {
    css?: {};
    className?: string;
    children?: React.ReactNode;
    color?: string;
    onClose?: () => void;
}
declare const _default: (props: Props) => JSX.Element;
export default _default;
