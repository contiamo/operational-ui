import AbstractFocus from "./abstract_focus";
import { IState, TStateWriter, TEvents, TSeriesEl } from "./typings";
declare abstract class AbstractDrawingFocus extends AbstractFocus {
    constructor(state: IState, stateWriter: TStateWriter, events: TEvents, el: TSeriesEl);
    abstract onElementHover(): (payload: {
        focusPoint: any;
        d: any;
    }) => void;
    onElementOut(): () => void;
    onMouseLeave(): () => void;
}
export default AbstractDrawingFocus;
