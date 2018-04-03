/// <reference types="react" />
import * as React from "react";
export interface Props {
    id?: string;
    css?: any;
    className?: string;
    children?: React.ReactNode;
}
declare const Card: (props: Props) => JSX.Element;
export default Card;
