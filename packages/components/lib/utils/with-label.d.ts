/// <reference types="react" />
import * as React from "react";
import { Css } from "../types";
declare const withLabel: <T extends React.StatelessComponent<P>, P extends Pick<React.HTMLProps<HTMLDivElement>, "label" | "className" | "id"> & {
    css?: Css;
}>(Component: T) => React.StatelessComponent<P>;
export default withLabel;
