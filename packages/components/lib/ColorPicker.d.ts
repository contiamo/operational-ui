/// <reference types="react" />
import * as React from "react";
import { RGBColor } from "react-color";
export interface Props {
    id?: string | number;
    css?: {};
    className?: string;
    color?: string;
    size?: number;
    onChange?: (color: string) => any;
}
export interface State {
    isPickerOpen: boolean;
}
declare class ColorPicker extends React.Component<Props, State> {
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
export default ColorPicker;
