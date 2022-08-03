import { getCache, setCache } from './cache';

const eventNameSpace = 'event';

type EventName = string;
type PayLoad = Record<string, any>;

interface Hooks {
  publish(eventName: EventName, payload: PayLoad): void;
  subscribe(
    eventName: EventName,
    callback: (payload: PayLoad, once?: boolean) => void
  ): Function;
  unSubscribe(
    eventName: EventName,
    callback: (payload: PayLoad, once?: boolean) => void
  ): void;
  hasTopic(eventName: EventName): boolean;
}

class EventBus implements Hooks {
  eventEmitter: Record<string, Function[]>;
  constructor() {
    this.eventEmitter = {};
  }
  publish(eventName: EventName, payload: PayLoad) {
    const cbs = this.eventEmitter[eventName];
    if (Array.isArray(cbs)) {
      cbs.forEach((cb) => cb(payload));
    }
  }
  subscribe(eventName: EventName, callback: (payload: PayLoad) => void) {
    if (!this.hasTopic(eventName)) {
      this.eventEmitter[eventName] = [];
    }
    this.eventEmitter[eventName].push(callback);
    return () => this.unSubscribe(eventName, callback)
  }
  unSubscribe(eventName: EventName, callback: (payload: PayLoad) => void) {
    if (this.hasTopic(eventName) && callback) {
      this.eventEmitter[eventName] = this.eventEmitter[eventName].filter(
        (cb) => cb !== callback
      );
    }
  }
  hasTopic(eventName: EventName): boolean {
    return !!this.eventEmitter[eventName];
  }
}

let eventBus: EventBus = getCache(eventNameSpace) as EventBus;
if (!eventBus) {
  eventBus = new EventBus();
  setCache(eventNameSpace, eventBus);
}

export default eventBus;
