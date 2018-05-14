/// <reference types="react" />
import * as React from "react";
import { Css } from "./types";
export interface Props {
    css?: Css;
    className?: string;
    children?: React.ReactNode;
    color?: string;
    onClose?: () => void;
}
declare const Message: (props: Props) => JSX.Element;
export default Message;
