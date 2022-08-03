declare type EventName = string;
declare type PayLoad = Record<string, any>;
declare type CallBack = (payload: PayLoad) => void;
interface FuncHooks {
    publish(eventName: EventName, payload: PayLoad): void;
    subscribe(eventName: EventName, callback: CallBack, once?: boolean): () => void;
    unSubscribe(eventName: EventName, callback: CallBack): void;
    hasTopic(eventName: EventName): boolean;
}
declare class EventBus implements FuncHooks {
    eventEmitter: Record<string, CallBack[]>;
    constructor();
    publish(eventName: EventName, payload: PayLoad): void;
    subscribe(eventName: EventName, callback: CallBack, once?: boolean): () => void;
    unSubscribe(eventName: EventName, callback: (payload: PayLoad) => void): void;
    hasTopic(eventName: EventName): boolean;
}
declare let eventBus: EventBus;
export default eventBus;
//# sourceMappingURL=EventBusWithWindow.d.ts.map