/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
export interface Props {
    id?: string;
    css?: Css;
    className?: string;
    /** Content CSS override */
    contentCss?: Css;
    /** Content class name */
    contentClassName?: string;
    /** Children */
    children: React.ReactNode;
    onClose?: () => void;
}
declare class Modal extends React.Component<Props, {}> {
    contentNode: any;
    render(): JSX.Element;
}
export default Modal;
