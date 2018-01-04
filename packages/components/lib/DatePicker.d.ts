export interface IProps {
    id?: string;
    domId?: string;
    label?: string;
    start?: string;
    end?: string;
    onChange?: (date: {
        start?: string;
        end?: string;
    }) => void;
    css?: any;
    className?: string;
    placeholder?: string;
}
export interface IState {
    isExpanded: boolean;
    year: number;
    month: number;
}
declare const _default: any;
export default _default;
