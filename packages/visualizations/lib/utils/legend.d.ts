import { IEvents, IObject, IState, TStateWriter, TD3Selection } from "./typings";
declare abstract class Legend {
    drawn: boolean;
    events: IEvents;
    float: string;
    legend: TD3Selection;
    position: string;
    previousRequirements: any[];
    state: IState;
    stateWriter: TStateWriter;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TD3Selection, options: IObject);
    draw(): void;
    requirements(): (string | boolean)[];
    initialDraw(): void;
    appendLegendElements(): void;
    updateDraw(): void;
    updateComparisonLegend(): void;
    setFixedLegendDimensions(): void;
    abstract data(): IObject[];
    abstract dataKey(d: IObject): string;
    abstract colorAccessor(d: IObject): string;
    abstract labelAccessor(d: IObject): string;
    onComponentHover(d: IObject, el: HTMLElement): void;
    abstract currentOptions(datum: IObject): IObject;
    dimensions(): {
        height: number;
        width: number;
    };
    updateDimensions(): void;
    remove(): void;
}
export default Legend;
