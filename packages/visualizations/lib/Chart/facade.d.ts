import { Accessors, ChartConfig, Data, Facade, Partial } from "./typings";
declare class ChartFacade implements Facade {
    private __disposed;
    private canvas;
    private components;
    private context;
    private customColorAccessor;
    private events;
    private series;
    private state;
    constructor(context: Element);
    private insertState();
    private initialConfig();
    private defaultColorAssigner(palette);
    private initialAccessors();
    private initialComputed();
    private insertCanvas();
    private insertComponents();
    private insertSeries();
    data(data?: Data): Data;
    config(config?: Partial<ChartConfig>): ChartConfig;
    accessors(type: string, accessors: Accessors<any>): Accessors<any>;
    on(event: string, handler: any): void;
    off(event: string, handler: any): void;
    draw(): Element;
    close(): void;
}
export default ChartFacade;
