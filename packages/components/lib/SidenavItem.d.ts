/// <reference types="react" />
export interface Props {
    id?: string | number;
    className?: string;
    onClick?: () => void;
    active?: boolean;
    css?: {};
    label: string;
}
declare const SidenavItem: (props: Props) => JSX.Element;
export default SidenavItem;
