/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    css?: Css;
    className?: string;
    /** Message contents, can be any html element/React fragment. */
    children?: React.ReactNode;
    /** Background message color */
    color?: string;
    /** Called when close icon is clicked. Icon is not rendered at all if this prop is not specified. */
    onClose?: () => void;
}
declare const Message: (props: Props) => JSX.Element;
export default Message;
