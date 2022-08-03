import { getCache, setCache } from './cache';

const PubSubNameSpace = 'PubSubNameSpace';

type ChannelName = string;
type TopicName = string;
type PayLoad = any;
type Callback = (payload: PayLoad) => void;

interface FuncHooks {
  publish(channel: ChannelName, topic: TopicName, payload: PayLoad): void;
  subscribe(
    channel: ChannelName,
    topic: TopicName,
    callback: (payload: PayLoad) => void,
    once?: boolean
  ): () => void;
  unSubscribe(channel: ChannelName, topic: TopicName, callback: Callback): void;
  hasTopic(channel: ChannelName, topic: TopicName): boolean;
}

class PubSub implements FuncHooks {
  observer: Record<string, Record<string, Callback[]>>;
  constructor() {
    this.observer = {};
  }
  publish(channel: ChannelName, topic: TopicName, payload: PayLoad) {
    const cbs = this.observer?.[channel]?.[topic];
    if (Array.isArray(cbs)) {
      cbs.forEach((cb) => cb(payload));
    }
  }

  subscribe(
    channel: ChannelName,
    topic: TopicName,
    callback: (payload: PayLoad) => void,
    once?: boolean
  ): () => void {
    if (!this.hasTopic(channel, topic)) {
      if (!this.observer[channel]) this.observer[channel] = {};
      this.observer[channel][topic] = [];
    }
    if (once) {
      // @ts-ignore
      const onlyOnce = (...args) => {
        this.unSubscribe(channel, topic, callback);
        callback.apply(this, args as any);
      };
      onlyOnce.origin = callback;
      this.observer[channel][topic].push(onlyOnce);
    } else {
      this.observer[channel][topic].push(callback);
    }
    return () => this.unSubscribe(channel, topic, callback);
  }

  unSubscribe(channel: ChannelName, topic: TopicName, callback: Callback) {
    if (this.hasTopic(channel, topic) && callback) {
      this.observer[channel][topic] = this.observer[channel][topic].filter(
        // @ts-ignore
        (cb) => cb !== callback && cb.origin !== callback
      );
    }
  }
  hasTopic(channel: ChannelName, topic: TopicName): boolean {
    return Array.isArray(this.observer?.[channel]?.[topic]);
  }
}

let pubSub: PubSub = getCache(PubSubNameSpace) as PubSub;
if (!pubSub) {
  pubSub = new PubSub();
  setCache(PubSubNameSpace, pubSub);
}

export default pubSub;
