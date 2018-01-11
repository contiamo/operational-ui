/// <reference types="react" />
import * as React from "react";
export interface IProps {
    css?: {};
    className?: string;
    username?: string;
    password?: string;
    passwordConfirmation?: string;
    error?: string;
    title?: string;
    processing?: boolean;
    onSubmit?: () => void;
    onChange?: (change: {}) => void;
}
export interface IState {
}
export default class Auth extends React.Component<IProps, IState> {
    render(): JSX.Element;
}
