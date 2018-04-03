/// <reference types="react" />
export interface Props {
    id?: string;
    css?: {};
    className?: string;
    open?: boolean;
    onToggle?: () => void;
    label?: string;
    children?: any;
}
declare const SidebarHeader: (props: Props) => JSX.Element;
export default SidebarHeader;
