export declare const computeScale: (range: [number, number], ticks: number[]) => (val: number) => number;
export declare const computeSteps: (domain: [number, number], range: [number, number], spacing: number, minTicks: number) => [number, number, number];
export declare const computeTickNumber: (range: [number, number], tickSpacing: number, minTicks?: number) => number;
export declare const computeTicks: (steps: [number, number, number]) => number[];
export declare const computeDomain: (data: number[], start: number, end: number) => [number, number];
export declare const extentCushion: (extent: [number, number]) => [number, number];
export declare const guess: (data?: number[]) => number[];
export declare const ruleClass: (ruleValue: number, index: number, ticks: number[]) => string;
export declare const tickFormatter: (step: number, unitTick: number, displayUnit: string) => (num: number) => string | number;
