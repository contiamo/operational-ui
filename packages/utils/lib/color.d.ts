declare const readableTextColor: (background: string) => (workingColors: string[]) => string;
declare const darken: (color: string) => (percentage: number) => string;
declare const lighten: (color: string) => (percentage: number) => string;
declare const setBrightness: (color: string, targetBrightness: number) => string;
declare const transparentize: (color: string) => (percentage: number) => string;
export { readableTextColor, darken, lighten, transparentize, setBrightness };
