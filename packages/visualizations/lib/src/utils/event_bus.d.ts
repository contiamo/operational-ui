declare class EventEmitter {
    subscribers: {
        [key: string]: any[];
    };
    on(eventName: string, callback: any): void;
    removeListener(eventName: string, callback: any): void;
    removeAllListeners(eventName: string): void;
    emit(eventName: string, eventData?: any): void;
    removeAll(): void;
}
export default EventEmitter;
