/// <reference types="react" />
import * as React from "react";
import { RGBColor } from "react-color";
export interface IProps {
    id?: string | number;
    css?: {};
    className?: string;
    color?: string;
    size?: number;
    onChange?: (color: string) => any;
}
export interface IState {
    isPickerOpen: boolean;
}
export default class ColorPicker extends React.Component<IProps, IState> {
    static defaultProps: {
        color: string;
        size: number;
    };
    state: {
        isPickerOpen: boolean;
    };
    containerEl: HTMLDivElement | null;
    handleClickOutside: (e: MouseEvent) => void;
    handleEsc: (e: KeyboardEvent) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    togglePicker(): void;
    close(): void;
    onColorChange(color: {
        hex: string;
        rgb: RGBColor;
    }): void;
    render(): JSX.Element;
}
