/// <reference types="react" />
export interface Props {
    id?: string;
    css?: any;
    className?: string;
    children?: any;
    onClick?: () => void;
    __isContextMenuItem?: boolean;
}
declare const _default: ((props: Props) => JSX.Element) & {
    defaultProps: {
        __isContextMenuItem: boolean;
    };
};
export default _default;
