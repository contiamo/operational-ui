import Rules from "../Chart/axes/rules";
import { AxisClass, D3Selection, EventBus, Object, State, StateWriter } from "./typings";
declare class AxesManager {
    axes: Object<AxisClass<any>>;
    axesDrawn: ("x" | "y")[];
    els: Object<D3Selection>;
    events: EventBus;
    oldAxes: Object<AxisClass<any>>;
    rules: Object<Rules>;
    state: State;
    stateWriter: StateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, els: Object<D3Selection>);
    draw(): void;
    private updateAxes();
    private createOrUpdate(options, position);
    private create(position, options);
    private update(position, options);
    private setBaselines();
    private drawAxes(orientation);
    private onMarginsUpdated(isXAxis);
    updateRules(orientation: "x" | "y"): void;
    removeRules(orientation: "x" | "y"): void;
    private remove(axis, position);
}
export default AxesManager;
