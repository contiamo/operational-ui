import { Selection } from "d3-selection";
import { Transition } from "d3-transition";
export declare const withD3Element: (func: any) => (datum: any, ...args: any[]) => any;
export declare const transitionIfVisible: (selection: Selection<any, any, any, any>, duration: number) => Selection<any, any, any, any> | Transition<any, any, any, any>;
export declare const onTransitionEnd: (selection: Transition<any, any, any, any>, func: () => void) => Transition<any, any, any, any>;
