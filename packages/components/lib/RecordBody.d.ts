/// <reference types="react" />
import * as React from "react";
export interface Props {
    css?: {};
    className?: string;
    children?: React.ReactNode;
    __isRecordBody?: boolean;
}
declare const _default: ((props: Props) => JSX.Element) & {
    defaultProps: {
        __isRecordBody: boolean;
    };
};
export default _default;
