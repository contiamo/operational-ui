/// <reference types="react" />
export interface Props {
    id?: string | number;
    css?: {};
    className?: string;
    open?: boolean;
    onToggle?: () => void;
    label?: string;
    children?: any;
}
declare const SidebarHeader: (props: Props) => JSX.Element;
export default SidebarHeader;
