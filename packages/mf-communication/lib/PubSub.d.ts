declare type ChannelName = string;
declare type TopicName = string;
declare type PayLoad = any;
declare type Callback = (payload: PayLoad) => void;
interface FuncHooks {
    publish(channel: ChannelName, topic: TopicName, payload: PayLoad): void;
    subscribe(channel: ChannelName, topic: TopicName, callback: (payload: PayLoad) => void, once?: boolean): () => void;
    unSubscribe(channel: ChannelName, topic: TopicName, callback: Callback): void;
    hasTopic(channel: ChannelName, topic: TopicName): boolean;
}
declare class PubSub implements FuncHooks {
    observer: Record<string, Record<string, Callback[]>>;
    constructor();
    publish(channel: ChannelName, topic: TopicName, payload: PayLoad): void;
    subscribe(channel: ChannelName, topic: TopicName, callback: (payload: PayLoad) => void, once?: boolean): () => void;
    unSubscribe(channel: ChannelName, topic: TopicName, callback: Callback): void;
    hasTopic(channel: ChannelName, topic: TopicName): boolean;
}
declare let pubSub: PubSub;
export default pubSub;
//# sourceMappingURL=PubSub.d.ts.map