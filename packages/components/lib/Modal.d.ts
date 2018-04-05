/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: string;
    css?: any;
    className?: string;
    childClassName?: string;
    children: React.ReactNode;
    onClose?: () => void;
}
declare class Modal extends React.Component<Props, {}> {
    contentNode: any;
    render(): JSX.Element;
}
export default Modal;
