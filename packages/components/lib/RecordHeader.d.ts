/// <reference types="react" />
import * as React from "react";
export interface Props {
    css?: {};
    className?: string;
    children?: React.ReactNode;
    __isRecordHeader?: boolean;
}
declare const _default: ((props: Props) => JSX.Element) & {
    defaultProps: {
        __isRecordHeader: boolean;
    };
};
export default _default;
