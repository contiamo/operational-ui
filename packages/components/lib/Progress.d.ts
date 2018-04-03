/// <reference types="react" />
export interface Props {
    id?: string;
    css?: any;
    className?: string;
    error?: string;
    onRetry?: () => void;
    fadeParent?: boolean;
}
declare const Progress: (props: Props) => JSX.Element;
export default Progress;
