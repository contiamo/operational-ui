/// <reference types="react" />
export interface IProps {
    id?: string | number;
    css?: any;
    className?: string;
    children?: any;
    onClick?: () => void;
    __isContextMenuItem?: boolean;
}
declare const _default: ((props: IProps) => JSX.Element) & {
    defaultProps: {
        __isContextMenuItem: boolean;
    };
};
export default _default;
