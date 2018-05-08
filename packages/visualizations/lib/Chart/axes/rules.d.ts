import { D3Selection, State } from "../typings";
declare class Rules {
    el: D3Selection;
    orientation: "x" | "y";
    state: State;
    yRules: boolean;
    constructor(state: State, el: D3Selection, orientation: "x" | "y");
    draw(): void;
    private startAttributes();
    private attributes();
    private margin(axis);
    close(): void;
}
export default Rules;
