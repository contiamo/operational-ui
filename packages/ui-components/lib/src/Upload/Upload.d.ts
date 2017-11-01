/// <reference types="react" />
import * as React from "react";
export interface IRequestOptions {
    action?: string;
    data?: {};
    file?: File;
    headers?: {};
    name?: string;
}
export interface IProps {
    action: string;
    accept?: string;
    data?: {};
    disabled?: boolean;
    headers?: {};
    multiple?: boolean;
    name?: string;
    onBeforeUpload?: (file: File, fileList: File[]) => Promise<any> | void;
    onStartUpload?: (file: File) => void;
    onError?: (error: Error, file: File) => void;
    onSuccess?: (response: {}, file: File) => void;
    request?: (params: IRequestOptions) => Promise<any>;
}
declare class Upload extends React.Component<IProps, any> {
    static defaultProps: {
        accept: string;
        data: {};
        headers: {};
        multipart: boolean;
        multiple: boolean;
        name: string;
        onBeforeUpload: () => void;
        onStartUpload: () => void;
        onError: () => void;
        onSuccess: () => void;
    };
    fileInput: HTMLInputElement;
    onChange: (evt: any) => void;
    onClick: () => void;
    onDrop: (evt: DragEvent) => void;
    uploadAll: (files: File[]) => void;
    upload: (file: File, fileList: File[]) => Promise<void>;
    postFile: (file: File) => Promise<void>;
    render(): JSX.Element;
}
export default Upload;
