import { Accessors, Facade, InputData, ProcessFlowConfig } from "./typings";
declare class ProcessFlowFacade implements Facade {
    private __disposed;
    private canvas;
    private components;
    private context;
    private events;
    private series;
    private state;
    constructor(context: Element);
    private insertState();
    private initialConfig();
    private initialAccessors();
    private initialComputed();
    private insertCanvas();
    private insertComponents();
    private insertSeries();
    data(data?: InputData): InputData;
    config(config?: Partial<ProcessFlowConfig>): ProcessFlowConfig;
    accessors(type: string, accessors: Accessors<any>): Accessors<any>;
    on(event: string, handler: any): void;
    off(event: string, handler: any): void;
    draw(): Element;
    close(): void;
}
export default ProcessFlowFacade;
