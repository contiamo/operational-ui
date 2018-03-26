import { Accessors, Facade, PieChartConfig } from "./typings";
declare class PieChartFacade implements Facade {
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
    data(data?: any): any;
    config(config?: Partial<PieChartConfig>): PieChartConfig;
    accessors(type: string, accessors: Accessors<any>): Accessors<any>;
    on(event: string, handler: any): void;
    off(event: string, handler: any): void;
    draw(): Element;
    close(): void;
}
export default PieChartFacade;
