export declare const readableTextColor: (backgroundColor: string, workingColors: string[]) => string;
export declare const darken: (color: string, percentage: number) => string;
export declare const lighten: (color: string, percentage: number) => string;
export declare const getBrightness: (color: string) => number;
export declare const setBrightness: (color: string, targetBrightness: number) => string;
export declare const transparentize: (color: string) => (percentage: number) => string;
