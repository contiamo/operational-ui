import { Accessors, Facade, SunburstConfig } from "./typings";
declare class SunburstFacade implements Facade {
    private __disposed;
    private canvas;
    private components;
    private context;
    private customColorAccessor;
    private events;
    private state;
    constructor(context: Element);
    private insertState();
    private initialConfig();
    private defaultColorAssigner(palette);
    private initialAccessors();
    private initialComputed();
    private insertCanvas();
    private insertComponents();
    data(data?: any): any;
    config(config?: Partial<SunburstConfig>): SunburstConfig;
    accessors(type: string, accessors: Accessors<any>): Accessors<any>;
    on(event: string, handler: any): void;
    off(event: string, handler: any): void;
    private findNode;
    draw(): Element;
    close(): void;
}
export default SunburstFacade;
