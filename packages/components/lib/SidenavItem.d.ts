/// <reference types="react" />
export interface Props {
    id?: string | number;
    className?: string;
    onClick?: () => void;
    active?: boolean;
    css?: {};
    label: string;
}
declare const _default: (props: Props) => JSX.Element;
export default _default;
