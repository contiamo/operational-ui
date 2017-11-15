/// <reference types="react" />
import * as React from "react";
export interface IProps {
    key?: string | number;
    css?: any;
    className?: string;
    childClassName?: string;
    children: React.ReactNode;
    onClose?: () => void;
}
declare class Modal extends React.Component<IProps, {}> {
    contentNode: any;
    render(): JSX.Element;
}
export default Modal;
