/// <reference types="react" />
export interface IProps {
    id?: string | number;
    className?: string;
    onClick?: () => void;
    active?: boolean;
    css?: {};
    label: string;
}
declare const SidenavItem: (props: IProps) => JSX.Element;
export default SidenavItem;
