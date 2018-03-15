/// <reference types="react" />
import * as React from "react";
import { IconName } from "@operational/components";
export interface Props {
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
    icon?: IconName | React.ReactNode;
}
export interface State {
}
export default class Auth extends React.Component<Props, State> {
    render(): JSX.Element;
}
