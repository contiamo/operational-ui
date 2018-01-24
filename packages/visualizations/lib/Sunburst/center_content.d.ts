import { TD3Selection, IObject, IState, TStateWriter, IEvents } from "./typings";
declare class CenterContent {
    el: TD3Selection;
    events: IEvents;
    state: IState;
    stateWriter: TStateWriter;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TD3Selection);
    update(payload: IObject): void;
}
export default CenterContent;
